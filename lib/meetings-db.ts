import type { SacramentMeeting, User } from './types';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function getUserByEmail(email: string): Promise<User> {
  try {
    const rows = await sql`SELECT * FROM users WHERE email = ${email}`;
    return rows[0] as User;
  }
  catch (error) {
    console.error()
    throw new Error("This user does not exist.")
  }
}

const ITEMS_PER_PAGE = 5;

export async function getMeetings(
  query: string | null = null,
  currentPage: number = 1
): Promise<SacramentMeeting[]> {
  const searchTerm = query ? `%${query}%` : '%';
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings
    WHERE
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
  return rows as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(
  query: string = ''
): Promise<number> {
  const searchTerm = `%${query}%`;
  const rows = await sql`
    SELECT COUNT(*) FROM meetings
    WHERE
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;
  return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings WHERE id = ${id}
  `;
  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function getNewMeetingId(): Promise<number> {
  const rows = await sql`SELECT * FROM meetings`;
  const ids = rows.map((row) => row.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
};

export async function addMeeting(
  data: Omit<SacramentMeeting, 'id'>) {
  const id = await getNewMeetingId();
  try {
    await sql`
    INSERT INTO meetings (
      id, date, meeting_type, presiding, conducting, announcements,
      opening_hymn, opening_prayer, ward_business, stake_business, sacrament_hymn, speakers, closing_hymn, closing_prayer
    ) VALUES (
      ${id}, ${data.date}, ${data.meetingType as string}, ${data.presiding}, ${data.conducting}, ${(data.announcements ?? [])},
      ${data.openingHymn}, ${data.openingPrayer}, ${JSON.stringify(data.wardBusiness)}::json, ${data.stakeBusiness}, ${data.sacramentHymn}, ${JSON.stringify(data.speakers)}::json, ${data.closingHymn}, ${data.closingPrayer}
    )
  `;
  }
  catch (error: unknown) {
    if (error instanceof Error) {
    console.log('meetings-db error:')
      console.error(error)
  } else {
    console.error("An unexpected error occurred", error);
  }
  }
}

export async function updateMeeting(updates: SacramentMeeting) {
  try {
    await sql `UPDATE meetings SET date = ${updates.date}, meeting_type = ${updates.meetingType as string}, presiding = ${updates.presiding}, conducting = ${updates.conducting}, announcements = ${(updates.announcements ?? [])}, opening_hymn = ${(updates.openingHymn)}, opening_prayer = ${updates.openingPrayer}, ward_business = ${JSON.stringify(updates.wardBusiness)}::json, stake_business = ${updates.stakeBusiness}, sacrament_hymn = ${(updates.sacramentHymn)}, speakers = ${JSON.stringify(updates.speakers)}::json, closing_hymn = ${(updates.closingHymn)}, closing_prayer = ${updates.closingPrayer} WHERE id = ${updates.id}`
  }
  catch (error: unknown){
    if (error instanceof Error) {
    console.log('meetings-db error:')
      console.error(error)
  } else {
    console.error("An unexpected error occurred", error);
  }
  }
}

export async function deleteMeeting(id: number) {
  try {
    await sql`DELETE FROM meetings WHERE id = ${id}`;
  }
  catch {
    throw new Error("The meeting was unable to be deleted from the database.")
  }
}