'use server';
import { deleteMeeting, addMeeting, updateMeeting} from '@/lib/meetings-db';
import type { SacramentMeeting, MeetingType, Hymn, SpeakerItem, WardBusinessItem } from '../lib/types';
import { revalidatePath } from 'next/cache';
import { redirect } from "next/navigation";
import { z } from 'zod';

const meetingSchema = z.object({
  date: z.date(),
  meetingType: z.string().trim().min(1, { message: 'Meeting type is required' }).max(10, { message: 'Please select a valid meeting type' }),
  presiding: z.string().trim().min(1, { message: 'Presiding is required' }),
  conducting: z.string().trim().min(1, { message: 'Conducting is required' }),
  announcements: z.string().trim().optional(),
  openingHymnNumber: z.number().min(1, { message: 'Opening hymn number is required' }),
  openingHymnTitle: z.string().trim().min(1, { message: 'Opening hymn title is required' }),
  openingPrayer: z.string().trim().min(1, { message: 'Opening prayer is required' }),
  wardBusiness: z.string().trim().min(1, { message: 'Ward business is required' }),
  stakeBusiness: z.boolean(),
  sacramentHymnNumber: z.number().min(1, { message: 'Sacrament hymn number is required' }),
  sacramentHymnTitle: z.string().trim().min(1, { message: 'Sacrament hymn title is required' }),
  speaker1Name: z.string().trim().min(1, { message: 'Speaker 1 name is required' }),
  speaker1Topic: z.string().trim().min(1, { message: 'Speaker 1 topic is required' }),
  speaker1Type: z.enum(['speaker', 'musical-number']),
  speaker2Name: z.string().trim().optional(),
  speaker2Topic: z.string().trim().optional(),
  speaker2Type: z.enum(['speaker', 'musical-number']).optional(),
  speaker3Name: z.string().trim().optional(),
  speaker3Topic: z.string().trim().optional(),
  speaker3Type: z.enum(['speaker', 'musical-number']).optional(),
  closingHymnNumber: z.number().min(1, { message: 'Closing hymn number is required' }),
  closingHymnTitle: z.string().trim().min(1, { message: 'Closing hymn title is required' }),
  closingPrayer: z.string().trim().min(1, { message: 'Closing prayer is required' }),
});

export type State = {
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    announcements?: string[];
    openingHymnNumber?: string[];
    openingHymnTitle?: string[];
    openingPrayer?: string[];
    wardBusiness?: string[];
    stakeBusiness?: string[];
    sacramentHymnNumber?: string[];
    sacramentHymnTitle?: string[];
    speaker1Name?: string[];
    speaker1Topic?: string[];
    speaker1Type?: string[];
    speaker2Name?: string[];
    speaker2Topic?: string[];
    speaker2Type?: string[];
    speaker3Name?: string[];
    speaker3Topic?: string[];
    speaker3Type?: string[];
    closingHymnNumber?: string[];
    closingHymnTitle?: string[];
    closingPrayer?: string[];
  };
  message?: string | null;
};

export async function deleteMeetingAction(id: number) {
  try {
    await deleteMeeting(id);
    revalidatePath('/meetings');
  }
  catch (error) {
    console.error('Error deleting meeting:', error)
    throw new Error('Could not delete meeting. Please try again later.')
  }
  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function addMeetingAction(prevState: State, formData: FormData): Promise<State> {
  const raw = {
    date: formData.get('date') ? new Date(String(formData.get('date'))) : undefined,
    meetingType: formData.get('meetingType')?.toString() ?? '',
    presiding: formData.get('presiding')?.toString() ?? '',
    conducting: formData.get('conducting')?.toString() ?? '',
    announcements: formData.get('announcements')?.toString() ?? '',
    openingHymnNumber: formData.get('openingHymnNumber') ? Number(formData.get('openingHymnNumber')) : undefined,
    openingHymnTitle: formData.get('openingHymnTitle')?.toString() ?? '',
    openingPrayer: formData.get('openingPrayer')?.toString() ?? '',
    wardBusiness: formData.get('wardBusiness')?.toString() ?? '',
    stakeBusiness: formData.get('stakeBusiness') === 'on',
    sacramentHymnNumber: formData.get('sacramentHymnNumber') ? Number(formData.get('sacramentHymnNumber')) : undefined,
    sacramentHymnTitle: formData.get('sacramentHymnTitle')?.toString() ?? '',
    speaker1Name: formData.get('speaker1Name')?.toString() ?? '',
    speaker1Topic: formData.get('speaker1Topic')?.toString() ?? '',
    speaker1Type: formData.get('speaker1Type')?.toString() ?? '',
    speaker2Name: formData.get('speaker2Name')?.toString().trim() || undefined,
    speaker2Topic: formData.get('speaker2Topic')?.toString().trim() || undefined,
    speaker2Type: formData.get('speaker2Name') ? (formData.get('speaker2Type')?.toString() ?? 'speaker') : undefined,
    speaker3Name: formData.get('speaker3Name')?.toString().trim() || undefined,
    speaker3Topic: formData.get('speaker3Topic')?.toString().trim() || undefined,
    speaker3Type: formData.get('speaker3Name') ? (formData.get('speaker3Type')?.toString() ?? 'speaker') : undefined,
    closingHymnNumber: formData.get('closingHymnNumber') ? Number(formData.get('closingHymnNumber')) : undefined,
    closingHymnTitle: formData.get('closingHymnTitle')?.toString() ?? '',
    closingPrayer: formData.get('closingPrayer')?.toString() ?? '',
  }

  const parsed = meetingSchema.safeParse(raw);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    console.error(`Parsing error: ${JSON.stringify(errors)}`);
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to create meeting.',
    };
  }

  const meetingType: MeetingType = parsed.data.meetingType as MeetingType;

  const openingHymn: Hymn = {
    number: parsed.data.openingHymnNumber as number,
    title: parsed.data.openingHymnTitle as string,
  };

  const sacramentHymn: Hymn = {
    number: parsed.data.sacramentHymnNumber as number,
    title: parsed.data.sacramentHymnTitle as string,
  };

  const closingHymn: Hymn = {
    number: parsed.data.closingHymnNumber as number,
    title: parsed.data.closingHymnTitle as string,
  };

  const wardBusiness: WardBusinessItem = {
    description: parsed.data.wardBusiness as string,
  };

  const speaker1: SpeakerItem = {
    name: parsed.data.speaker1Name as string,
    topic: parsed.data.speaker1Topic as string,
    type: parsed.data.speaker1Type
  }

  const speaker2 = parsed.data.speaker2Name
    ? ({
        name: parsed.data.speaker2Name as string,
        topic: parsed.data.speaker2Topic as string,
        type: parsed.data.speaker2Type ?? 'speaker',
      } as SpeakerItem)
    : null;

  const speaker3 = parsed.data.speaker3Name
    ? ({
        name: parsed.data.speaker3Name as string,
        topic: parsed.data.speaker3Topic as string,
        type: parsed.data.speaker3Type ?? 'speaker',
      } as SpeakerItem)
    : null;

  const meeting: Omit<SacramentMeeting, 'id'> = {
    date: (parsed.data.date as Date).toISOString().split('T')[0],
    meetingType,
    presiding: parsed.data.presiding as string,
    conducting: parsed.data.conducting as string,
    announcements: parsed.data.announcements ? [parsed.data.announcements as string] : [],
    openingHymn,
    openingPrayer: parsed.data.openingPrayer as string,
    wardBusiness: [wardBusiness],
    stakeBusiness: parsed.data.stakeBusiness as boolean,
    sacramentHymn,
    speakers: [speaker1, ...(speaker2 ? [speaker2] : []), ...(speaker3 ? [speaker3] : [])],
    closingHymn,
    closingPrayer: parsed.data.closingPrayer
  }

  console.log(meeting)

  try {
    await addMeeting(meeting);
    revalidatePath('/meetings');
    redirect('/meetings')
  }
  catch (error)
  {
    console.error('Error adding meeting:', error)
    return {
      message: 'There was an error adding the meeting.'
    }
  }
};

export async function editMeetingAction(id: number, formData: FormData) {
  const raw = {
    date: formData.get('date') ? new Date(String(formData.get('date'))) : undefined,
    meetingType: formData.get('meetingType')?.toString() ?? '',
    presiding: formData.get('presiding')?.toString() ?? '',
    conducting: formData.get('conducting')?.toString() ?? '',
    announcements: formData.get('announcements')?.toString() ?? '',
    openingHymnNumber: formData.get('openingHymnNumber') ? Number(formData.get('openingHymnNumber')) : undefined,
    openingHymnTitle: formData.get('openingHymnTitle')?.toString() ?? '',
    openingPrayer: formData.get('openingPrayer')?.toString() ?? '',
    wardBusiness: formData.get('wardBusiness')?.toString() ?? '',
    stakeBusiness: formData.get('stakeBusiness') === 'on',
    sacramentHymnNumber: formData.get('sacramentHymnNumber') ? Number(formData.get('sacramentHymnNumber')) : undefined,
    sacramentHymnTitle: formData.get('sacramentHymnTitle')?.toString() ?? '',
    speaker1Name: formData.get('speaker1Name')?.toString() ?? '',
    speaker1Topic: formData.get('speaker1Topic')?.toString() ?? '',
    speaker1Type: formData.get('speaker1Type')?.toString() ?? '',
    speaker2Name: formData.get('speaker2Name')?.toString().trim() || undefined,
    speaker2Topic: formData.get('speaker2Topic')?.toString().trim() || undefined,
    speaker2Type: formData.get('speaker2Name') ? (formData.get('speaker2Type')?.toString() ?? 'speaker') : undefined,
    speaker3Name: formData.get('speaker3Name')?.toString().trim() || undefined,
    speaker3Topic: formData.get('speaker3Topic')?.toString().trim() || undefined,
    speaker3Type: formData.get('speaker3Name') ? (formData.get('speaker3Type')?.toString() ?? 'speaker') : undefined,
    closingHymnNumber: formData.get('closingHymnNumber') ? Number(formData.get('closingHymnNumber')) : undefined,
    closingHymnTitle: formData.get('closingHymnTitle')?.toString() ?? '',
    closingPrayer: formData.get('closingPrayer')?.toString() ?? '',
  }

  const parsed = meetingSchema.safeParse(raw);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    console.error(`Parsing error: ${JSON.stringify(errors)}`);
    throw new Error("Parsing failed.")
  }

  const meetingType: MeetingType = parsed.data.meetingType as MeetingType;

  const openingHymn: Hymn = {
    number: parsed.data.openingHymnNumber as number,
    title: parsed.data.openingHymnTitle as string,
  };

  const sacramentHymn: Hymn = {
    number: parsed.data.sacramentHymnNumber as number,
    title: parsed.data.sacramentHymnTitle as string,
  };

  const closingHymn: Hymn = {
    number: parsed.data.closingHymnNumber as number,
    title: parsed.data.closingHymnTitle as string,
  };

  const wardBusiness: WardBusinessItem = {
    description: parsed.data.wardBusiness as string,
  };

  const speaker1: SpeakerItem = {
    name: parsed.data.speaker1Name as string,
    topic: parsed.data.speaker1Topic as string,
    type: parsed.data.speaker1Type
  }

  const speaker2 = parsed.data.speaker2Name
    ? ({
        name: parsed.data.speaker2Name as string,
        topic: parsed.data.speaker2Topic as string,
        type: parsed.data.speaker2Type ?? 'speaker',
      } as SpeakerItem)
    : null;

  const speaker3 = parsed.data.speaker3Name
    ? ({
        name: parsed.data.speaker3Name as string,
        topic: parsed.data.speaker3Topic as string,
        type: parsed.data.speaker3Type ?? 'speaker',
      } as SpeakerItem)
    : null;

  const meeting: SacramentMeeting = {
    id: id,
    date: (parsed.data.date as Date).toISOString().split('T')[0],
    meetingType,
    presiding: parsed.data.presiding as string,
    conducting: parsed.data.conducting as string,
    announcements: parsed.data.announcements ? [parsed.data.announcements as string] : [],
    openingHymn,
    openingPrayer: parsed.data.openingPrayer as string,
    wardBusiness: [wardBusiness],
    stakeBusiness: parsed.data.stakeBusiness as boolean,
    sacramentHymn,
    speakers: [speaker1, ...(speaker2 ? [speaker2] : []), ...(speaker3 ? [speaker3] : [])],
    closingHymn,
    closingPrayer: parsed.data.closingPrayer
  }

  try {
    await updateMeeting(meeting);
    revalidatePath('/meetings');
  }
  catch (error)
  {
    console.error('Error editing meeting:', error)
    throw new Error("There was an error editing the meeting.")
  }
  redirect('/meetings')
};