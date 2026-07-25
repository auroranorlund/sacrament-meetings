'use server';

import Link from "next/link";
import { editMeetingAction } from "@/lib/actions";
import { getMeetingById } from "@/lib/meetings-db";
import { notFound } from "next/navigation";

export default async function EditMeetingPage({ params }: { params: Promise<{ id: string }> }) {

  const id = await Number((await params).id);
  if (Number.isNaN(id)) {
    throw new Error("Invalid meeting ID");
  }
  const getMeeting = await getMeetingById(id);
  if (!getMeeting) {
    notFound()
  }
  else {
    const meeting = getMeeting;
    const editMeetingWithId = editMeetingAction.bind(null, id);

    return (
      <main className="flex-1">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Edit Meeting</h1>
            <p className="py-2">Items with a <span className="text-red-500">*</span> are required.</p>
          </div>

          <form action={editMeetingWithId} className="space-y-8 p-6">
            <section className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium" htmlFor="date">
                  Date<span className="text-red-500">*</span>
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  defaultValue={meeting.date}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium" htmlFor="meetingType">
                  Meeting Type<span className="text-red-500">*</span>
                </label>
                <select
                  id="meetingType"
                  name="meetingType"
                  defaultValue={meeting.meetingType}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">Select a type</option>
                  <option value="regular">Regular</option>
                  <option value="testimony">Testimony</option>
                  <option value="stake">Stake</option>
                  <option value="general">General</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium " htmlFor="presiding">
                  Presiding<span className="text-red-500">*</span>
                </label>
                <input
                  id="presiding"
                  name="presiding"
                  type="text"
                  defaultValue={meeting.presiding}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium " htmlFor="conducting">
                  Conducting<span className="text-red-500">*</span>
                </label>
                <input
                  id="conducting"
                  name="conducting"
                  type="text"
                  defaultValue={meeting.conducting}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium" htmlFor="announcements">
                  Announcements
                </label>
                <textarea
                  id="announcements"
                  name="announcements"
                  rows={3}
                  defaultValue={meeting.announcements}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </section>

            <section className="space-y-4 rounded-lg p-4">
              <h2 className="text-lg font-semibold">Opening</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium" htmlFor="openingHymnNumber">
                    Opening Hymn Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="openingHymnNumber"
                    name="openingHymnNumber"
                    type="number"
                    min="1"
                    defaultValue={meeting.openingHymn.number}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium" htmlFor="openingHymnTitle">
                    Opening Hymn Title<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="openingHymnTitle"
                    name="openingHymnTitle"
                    type="text"
                    defaultValue={meeting.openingHymn.title}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium" htmlFor="openingPrayer">
                    Opening Prayer<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="openingPrayer"
                    name="openingPrayer"
                    rows={2}
                    defaultValue={meeting.openingPrayer}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-4 rounded-lg p-4">
              <h2 className="text-lg font-semibold">Ward and Stake Business</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium" htmlFor="wardBusiness">
                    Ward Business<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="wardBusiness"
                    name="wardBusiness"
                    rows={2}
                    defaultValue={meeting.wardBusiness[0].description}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input id="stakeBusiness" name="stakeBusiness" type="checkbox" className="h-4 w-4" />
                  <label htmlFor="stakeBusiness" className="text-sm font-medium ">
                    Includes stake business
                  </label>
                </div>
              </div>
            </section>

            <section className="space-y-4 rounded-lg p-4">
              <h2 className="text-lg font-semibold">Sacrament</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium " htmlFor="sacramentHymnNumber">
                    Sacrament Hymn Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="sacramentHymnNumber"
                    name="sacramentHymnNumber"
                    type="number"
                    min="1"
                    defaultValue={meeting.sacramentHymn.number}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium " htmlFor="sacramentHymnTitle">
                    Sacrament Hymn Title<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="sacramentHymnTitle"
                    name="sacramentHymnTitle"
                    type="text"
                    defaultValue={meeting.sacramentHymn.title}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-4 rounded-lg p-4">
              <h2 className="text-lg font-semibold">Speakers</h2>
              <div className="grid gap-6 md:grid-cols-1">
                <div>
                  <label className="mb-2 block text-sm font-medium" htmlFor="speaker1Name">
                    Speaker 1 Name<span className="text-red-500">*</span>
                  </label>
                  <input id="speaker1Name" name="speaker1Name" type="text"
                    defaultValue={meeting.speakers[0].name}
                    required className="w-full rounded-md border border-gray-300 px-3 py-2" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium" htmlFor="speaker1Topic">
                    Speaker 1 Topic<span className="text-red-500">*</span>
                  </label>
                  <input id="speaker1Topic" name="speaker1Topic" type="text"
                    defaultValue={meeting.speakers[0].topic}
                    required className="w-full rounded-md border border-gray-300 px-3 py-2" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium" htmlFor="speaker1Type">
                    Speaker 1 Type<span className="text-red-500">*</span>
                  </label>
                  <select id="speaker1Type" name="speaker1Type"
                    defaultValue={meeting.speakers[0].type}
                    required className="w-full rounded-md border border-gray-300 px-3 py-2">
                    <option value="speaker">Speaker</option>
                    <option value="musical-number">Musical Number</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium" htmlFor="speaker2Name">
                    Speaker 2 Name
                  </label>
                  <input id="speaker2Name" name="speaker2Name" type="text"
                    defaultValue={meeting.speakers[1]?.name || ''}
                    className="w-full rounded-md border border-gray-300 px-3 py-2" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium" htmlFor="speaker2Topic">
                    Speaker 2 Topic
                  </label>
                  <input id="speaker2Topic" name="speaker2Topic" type="text"
                    defaultValue={meeting.speakers[1]?.topic || ''}
                    className="w-full rounded-md border border-gray-300 px-3 py-2" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium" htmlFor="speaker2Type">
                    Speaker 2 Type
                  </label>
                  <select id="speaker2Type" name="speaker2Type"
                    defaultValue={meeting.speakers[1]?.type || ''}
                    className="w-full rounded-md border border-gray-300 px-3 py-2">
                    <option value="speaker">Speaker</option>
                    <option value="musical-number">Musical Number</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium" htmlFor="speaker3Name">
                    Speaker 3 Name
                  </label>
                  <input id="speaker3Name" name="speaker3Name" type="text"
                    defaultValue={meeting.speakers[2]?.name || ''}
                    className="w-full rounded-md border border-gray-300 px-3 py-2" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium" htmlFor="speaker3Topic">
                    Speaker 3 Topic
                  </label>
                  <input id="speaker3Topic" name="speaker3Topic" type="text"
                    defaultValue={meeting.speakers[2]?.topic || ''}
                    className="w-full rounded-md border border-gray-300 px-3 py-2" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium" htmlFor="speaker3Type">
                    Speaker 3 Type
                  </label>
                  <select id="speaker3Type" name="speaker3Type"
                    defaultValue={meeting.speakers[2]?.type || ''}
                    className="w-full rounded-md border border-gray-300 px-3 py-2">
                    <option value="speaker">Speaker</option>
                    <option value="musical-number">Musical Number</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="space-y-4 rounded-lg p-4">
              <h2 className="text-lg font-semibold">Closing</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium " htmlFor="closingHymnNumber">
                    Closing Hymn Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="closingHymnNumber"
                    name="closingHymnNumber"
                    type="number"
                    min="1"
                    defaultValue={meeting.closingHymn.number}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium " htmlFor="closingHymnTitle">
                    Closing Hymn Title<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="closingHymnTitle"
                    name="closingHymnTitle"
                    type="text"
                    defaultValue={meeting.closingHymn.title}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium " htmlFor="closingPrayer">
                    Closing Prayer<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="closingPrayer"
                    name="closingPrayer"
                    rows={2}
                    defaultValue={meeting.closingPrayer}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>
            </section>

            <div className="flex justify-end gap-3">
              <Link
                href="/meetings"
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Edit Meeting
              </button>
            </div>
          </form>
        </div>
      </main>
    );
  }
}