import type { SacramentMeeting } from '../lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

function formatHymn(hymn: SacramentMeeting['openingHymn']) {
  return `${hymn.number}. ${hymn.title}`;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const formattedDate = new Date(`${meeting.date}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="rounded-lg bg-card-background p-6 shadow-sm text-foreground">
      <header className="border-b border-slate-200 pb-4">
        <p className="text-sm font-semibold uppercase tracking-wide">
          {meeting.meetingType} Meeting
        </p>
        <h1 className="mt-1 text-2xl font-bold">{formattedDate}</h1>
        <p className="mt-2 text-sm">Meeting ID: {meeting.id}</p>
      </header>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section>
          <h2 className="text-lg font-semibold">Meeting Details</h2>
          <dl className="mt-3 space-y-3 text-sm">
            <div>
              <dt className="font-medium">Presiding</dt>
              <dd>{meeting.presiding}</dd>
            </div>
            <div>
              <dt className="font-medium">Conducting</dt>
              <dd>{meeting.conducting}</dd>
            </div>
            <div>
              <dt className="font-medium">Stake Business</dt>
              <dd>{meeting.stakeBusiness ? 'Yes' : 'No'}</dd>
            </div>
          </dl>
        </section>

        <section>
          <h2 className="text-lg font-semibold">Announcements</h2>
          {meeting.announcements && meeting.announcements.length > 0 ? (
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
              {meeting.announcements.map((announcement) => (
                <li key={announcement}>{announcement}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm">No announcements listed.</p>
          )}
        </section>
      </div>

      <div className="mt-8 space-y-6">
        <section>
          <h2 className="text-lg font-semibold">Hymns</h2>
          <div className="mt-3 space-y-2 text-sm">
            <p>
              <span className="font-medium">Opening Hymn:</span>{' '}
              {formatHymn(meeting.openingHymn)}
            </p>
            <p>
              <span className="font-medium">Sacrament Hymn:</span>{' '}
              {formatHymn(meeting.sacramentHymn)}
            </p>
            <p>
              <span className="font-medium">Closing Hymn:</span>{' '}
              {formatHymn(meeting.closingHymn)}
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold">Prayers</h2>
          <div className="mt-3 space-y-2 text-sm">
            <p>
              <span className="font-medium">Opening Prayer:</span>{' '}
              {meeting.openingPrayer}
            </p>
            <p>
              <span className="font-medium">Closing Prayer:</span>{' '}
              {meeting.closingPrayer}
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold">Speakers</h2>
          {meeting.speakers.length > 0 ? (
            <ul className="mt-3 space-y-3 text-sm">
              {meeting.speakers.map((speaker, index) => (
                <li key={`${speaker.name}-${index}`} className="rounded-md border border-slate-200 p-3">
                  <p className="font-medium">{speaker.name}</p>
                  <p className="mt-1">{speaker.topic}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide">
                    {speaker.type}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm">No speakers listed.</p>
          )}
        </section>

        <section>
          <h2 className="text-lg font-semibold">Ward Business</h2>
          {meeting.wardBusiness.length > 0 ? (
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
              {meeting.wardBusiness.map((item, index) => (
                <li key={`${item.description}-${index}`}>{item.description}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm">No ward business listed.</p>
          )}
        </section>
      </div>
    </article>
  );
}
