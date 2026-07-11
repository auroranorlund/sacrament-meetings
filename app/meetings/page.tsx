import MeetingCard from "@/components/MeetingCard";

export const dynamic = 'force-dynamic'

async function getMeetings() {
  try {
    const response = await fetch("https://sacrament-meetings-dun.vercel.app/api/meetings");
    return response.json();
  } catch (error) {
    console.error("Error fetching meetings:", error);
    return null;
  }
}

export default async function Meetings() {
  const meetings = await getMeetings();
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {meetingCards}
      </div>
    </div>
  </main>
  );
  }
}