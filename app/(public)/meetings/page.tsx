import MeetingCard from "@/components/MeetingCard";
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';
import { MeetingSearch } from '@/components/MeetingSearch';
import { Pagination } from '@/components/Pagination';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meetings',
};

export const dynamic = 'force-dynamic'

export default async function Meetings(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? '';
  const currentPage = Number(searchParams?.page) || 1;

  const meetings = await getMeetings(query, currentPage);
  const totalPages = await getMeetingsTotalPages(query);

  if (!meetings) {
    return (
    <main className="flex-1">
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Meetings</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <p>Error fetching meetings. Please try again later.</p>
      </div>
    </div>
  </main>
  );
  }
  else {
    const meetingCards = meetings.map((meeting: any) => (
      <MeetingCard key={meeting.id} meeting={meeting} />
    ));
    return (
    <main className="flex-1">
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Meetings</h2>
      <MeetingSearch />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {meetingCards}
          </div>
      <Pagination totalPages={totalPages} />
    </div>
  </main>
  );
  }
}