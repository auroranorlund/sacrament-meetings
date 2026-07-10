import Link from 'next/link';
import type { SacramentMeeting } from '../lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const formattedDate = new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(meeting.date));

  const meetingTypeLabel = meeting.meetingType
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const previewSpeakers = meeting.speakers
    .slice(0, 2)
    .map((speaker) => speaker.name)
    .join(', ');

  return (
    <Link
      href={`/meetings/${meeting.id}`}
      className="block rounded-lg bg-card-background p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            {formattedDate}
          </h3>
        </div>
        <span className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-foreground">
          {meetingTypeLabel}
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm text-foreground">
        <p>
          <span className="font-medium text-foreground">Presiding:</span>{' '}
          {meeting.presiding}
        </p>
        <p>
          <span className="font-medium text-foreground">Conducting:</span>{' '}
          {meeting.conducting}
        </p>
        <p>
          <span className="font-medium text-foreground">Speakers:</span>{' '}
          {previewSpeakers || 'No speakers listed'}
        </p>
      </div>

      <p className="mt-4 text-sm font-medium text-foreground">View details →</p>
    </Link>
  );
}
