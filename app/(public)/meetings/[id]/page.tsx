import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById } from '@/lib/meetings-db';
export const dynamic = 'force-dynamic'
import { redirect } from "next/navigation";
import { deleteMeetingAction } from "@/lib/actions";

export default async function MeetingDetails({ params }: { params: Promise<{ id: string }> }) {
    const id = await Number((await params).id);
    if (Number.isNaN(id)) {
        throw new Error("Invalid meeting ID");
    }
  const getMeeting = await getMeetingById(id);
  if (!getMeeting) {
    redirect("/meetings")
  }
  else {
    const meeting = getMeeting;
    const deleteMeetingActionWithId = deleteMeetingAction.bind(null, id);
    return (
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-6">Meeting Details</h2>
          <MeetingDetail meeting={meeting} />
          <form action={deleteMeetingActionWithId}>
                <button type="submit"
        className="rounded-md bg-red-600 px-4 py-2 my-5 text-sm font-medium text-white hover:bg-red-700"
              >
          Delete Meeting
        </button>
          </form>
        </div>
      </main>
    );
  }
} 