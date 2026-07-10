import { redirect } from "next/navigation";

function findRecentSunday() {
    const today = new Date();
    const dayOfWeek = today.getUTCDay();
    const recentSunday = new Date(today);
    recentSunday.setUTCDate(today.getUTCDate() - dayOfWeek);
    return recentSunday.toISOString().split('T')[0];
}

async function findRecentMeeting() {
    const recentSunday = findRecentSunday();
    const response = await fetch(`https://vercel.com/aurora-wdd-430/sacrament-meetings/EwoUkUf5uakwnaaq2n7z5yyRbbwa/api/meetings?date=${recentSunday}`);
    if (!response.ok) {
        return null;
    }
    else {
        return response.json();
    }
}

export default async function CurrentMeetingPage() {
    const recentMeeting = await findRecentMeeting();
    console.log(recentMeeting);
    if (!recentMeeting) {
        redirect(`/meetings`);
    }
    else {
        const meetingId = recentMeeting[0].id;
        console.log(meetingId);
        redirect(`/meetings/${meetingId}`);
    }
}