import MeetingDetail from "@/components/MeetingDetail";

async function getMeeting(id: number) {
    const response = await fetch(`http://localhost:3000/api/meetings/${id}`);
    if (!response.ok) {
    throw new Error("Failed to fetch meeting");
  }
  return response.json();
}

export default async function MeetingDetails({ params }: { params: Promise<{ id: string }> }) {
    const id = await Number((await params).id);
    if (Number.isNaN(id)) {
        throw new Error("Invalid meeting ID");
    }
    const meeting = await getMeeting(id);
  return (
    <main className="flex-1">
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Meeting Details</h2>
        <MeetingDetail meeting={meeting} />
    </div>
  </main>
  );
} 