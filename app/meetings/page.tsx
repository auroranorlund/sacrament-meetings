import MeetingCard from "@/components/MeetingCard";

async function getMeetings() {
  const response = await fetch("http://localhost:3000/api/meetings");
  if (!response.ok) {
    throw new Error("Failed to fetch meetings");
  }
  return response.json();
}

export default async function Meetings() {
  const meetings = await getMeetings();
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