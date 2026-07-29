'use client';

import { useActionState } from "react";
import Link from "next/link";
import { addMeetingAction, type State } from "@/lib/actions";

const initialState: State = { message: null, errors: {} };

export default function NewMeetingPage() {

  const today = new Date().toISOString().split("T")[0];

  const [state, formAction, isPending] = useActionState(addMeetingAction, initialState);

  return (
    <main className="flex-1">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Create a New Meeting</h1>
          <p className="py-2">Items with a <span className="text-red-500">*</span> are required.</p>
        </div>

        <form action={formAction} className="space-y-8 p-6">
          <section className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium" htmlFor="date">
                Date<span className="text-red-500">*</span>
              </label>
              <input
                id="date"
                name="date"
                type="date"
                defaultValue={today}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
              <div id="date-error" aria-live="polite" aria-atomic="true">
                {state.errors?.date?.map((error) => (
                  <p key={error} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium" htmlFor="meetingType">
                Meeting Type<span className="text-red-500">*</span>
              </label>
              <select
                id="meetingType"
                name="meetingType"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="">Select a type</option>
                <option value="regular">Regular</option>
                <option value="testimony">Testimony</option>
                <option value="stake">Stake</option>
                <option value="general">General</option>
              </select>
              <div id="meetingType-error" aria-live="polite" aria-atomic="true">
                {state.errors?.meetingType?.map((error) => (
                  <p key={error} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium " htmlFor="presiding">
                Presiding<span className="text-red-500">*</span>
              </label>
              <input
                id="presiding"
                name="presiding"
                type="text"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
              <div id="presiding-error" aria-live="polite" aria-atomic="true">
                {state.errors?.presiding?.map((error) => (
                  <p key={error} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium " htmlFor="conducting">
                Conducting<span className="text-red-500">*</span>
              </label>
              <input
                id="conducting"
                name="conducting"
                type="text"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
              <div id="conducting-error" aria-live="polite" aria-atomic="true">
                {state.errors?.conducting?.map((error) => (
                  <p key={error} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium" htmlFor="announcements">
                Announcements
              </label>
              <textarea
                id="announcements"
                name="announcements"
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
              <div id="announcements-error" aria-live="polite" aria-atomic="true">
                {state.errors?.announcements?.map((error) => (
                  <p key={error} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
              </div>
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
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              <div id="openingHymnNumber-error" aria-live="polite" aria-atomic="true">
                {state.errors?.openingHymnNumber?.map((error) => (
                  <p key={error} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
              </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium" htmlFor="openingHymnTitle">
                  Opening Hymn Title<span className="text-red-500">*</span>
                </label>
                <input
                  id="openingHymnTitle"
                  name="openingHymnTitle"
                  type="text"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              <div id="openingHymnTitle-error" aria-live="polite" aria-atomic="true">
                {state.errors?.openingHymnTitle?.map((error) => (
                  <p key={error} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
              </div>
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium" htmlFor="openingPrayer">
                  Opening Prayer<span className="text-red-500">*</span>
                </label>
                <textarea
                  id="openingPrayer"
                  name="openingPrayer"
                  rows={2}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              <div id="openingPrayer-error" aria-live="polite" aria-atomic="true">
                {state.errors?.openingPrayer?.map((error) => (
                  <p key={error} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
              </div>
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
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              <div id="wardBusiness-error" aria-live="polite" aria-atomic="true">
                {state.errors?.wardBusiness?.map((error) => (
                  <p key={error} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
              </div>
              </div>
              <div className="flex items-center gap-2">
                <input id="stakeBusiness" name="stakeBusiness" type="checkbox" className="h-4 w-4" />
                <label htmlFor="stakeBusiness" className="text-sm font-medium ">
                  Includes stake business
                </label>
              <div id="stakeBusiness-error" aria-live="polite" aria-atomic="true">
                {state.errors?.stakeBusiness?.map((error) => (
                  <p key={error} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
              </div>
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
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              <div id="sacramentHymnNumber-error" aria-live="polite" aria-atomic="true">
                {state.errors?.sacramentHymnNumber?.map((error) => (
                  <p key={error} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
              </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium " htmlFor="sacramentHymnTitle">
                  Sacrament Hymn Title<span className="text-red-500">*</span>
                </label>
                <input
                  id="sacramentHymnTitle"
                  name="sacramentHymnTitle"
                  type="text"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              <div id="sacramentHymnTitle-error" aria-live="polite" aria-atomic="true">
                {state.errors?.sacramentHymnTitle?.map((error) => (
                  <p key={error} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
              </div>
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
                <input id="speaker1Name" name="speaker1Name" type="text" required className="w-full rounded-md border border-gray-300 px-3 py-2" />
              <div id="speaker1Name-error" aria-live="polite" aria-atomic="true">
                {state.errors?.speaker1Name?.map((error) => (
                  <p key={error} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
              </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium" htmlFor="speaker1Topic">
                  Speaker 1 Topic<span className="text-red-500">*</span>
                </label>
                <input id="speaker1Topic" name="speaker1Topic" type="text" required className="w-full rounded-md border border-gray-300 px-3 py-2" />
                <div id="speaker1Topic-error" aria-live="polite" aria-atomic="true">
                {state.errors?.speaker1Topic?.map((error) => (
                  <p key={error} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
              </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium" htmlFor="speaker1Type">
                  Speaker 1 Type<span className="text-red-500">*</span>
                </label>
                <select id="speaker1Type" name="speaker1Type" required className="w-full rounded-md border border-gray-300 px-3 py-2">
                  <option value="speaker">Speaker</option>
                  <option value="musical-number">Musical Number</option>
                </select>
                <div id="speaker1Type-error" aria-live="polite" aria-atomic="true">
                {state.errors?.speaker1Type?.map((error) => (
                  <p key={error} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
              </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium" htmlFor="speaker2Name">
                  Speaker 2 Name
                </label>
                <input id="speaker2Name" name="speaker2Name" type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" />
                <div id="speaker2Name-error" aria-live="polite" aria-atomic="true">
                {state.errors?.speaker2Name?.map((error) => (
                  <p key={error} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
              </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium" htmlFor="speaker2Topic">
                  Speaker 2 Topic
                </label>
                <input id="speaker2Topic" name="speaker2Topic" type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" />
                <div id="speaker2Topic-error" aria-live="polite" aria-atomic="true">
                {state.errors?.speaker2Topic?.map((error) => (
                  <p key={error} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
              </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium" htmlFor="speaker2Type">
                  Speaker 2 Type
                </label>
                <select id="speaker2Type" name="speaker2Type" className="w-full rounded-md border border-gray-300 px-3 py-2">
                  <option value="speaker">Speaker</option>
                  <option value="musical-number">Musical Number</option>
                </select>
                <div id="speaker2Type-error" aria-live="polite" aria-atomic="true">
                {state.errors?.speaker2Type?.map((error) => (
                  <p key={error} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
              </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium" htmlFor="speaker3Name">
                  Speaker 3 Name
                </label>
                <input id="speaker3Name" name="speaker3Name" type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" />
                <div id="speaker2Name-error" aria-live="polite" aria-atomic="true">
                {state.errors?.speaker2Name?.map((error) => (
                  <p key={error} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
              </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium" htmlFor="speaker3Topic">
                  Speaker 3 Topic
                </label>
                <input id="speaker3Topic" name="speaker3Topic" type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" />
                <div id="speaker3Topic-error" aria-live="polite" aria-atomic="true">
                {state.errors?.speaker3Topic?.map((error) => (
                  <p key={error} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
              </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium" htmlFor="speaker3Type">
                  Speaker 3 Type
                </label>
                <select id="speaker3Type" name="speaker3Type" className="w-full rounded-md border border-gray-300 px-3 py-2">
                  <option value="speaker">Speaker</option>
                  <option value="musical-number">Musical Number</option>
                </select>
                <div id="speaker3Type-error" aria-live="polite" aria-atomic="true">
                {state.errors?.speaker3Type?.map((error) => (
                  <p key={error} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
              </div>
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
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                <div id="closingHymnNumber-error" aria-live="polite" aria-atomic="true">
                {state.errors?.closingHymnNumber?.map((error) => (
                  <p key={error} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
              </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium " htmlFor="closingHymnTitle">
                  Closing Hymn Title<span className="text-red-500">*</span>
                </label>
                <input
                  id="closingHymnTitle"
                  name="closingHymnTitle"
                  type="text"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                <div id="closingHymnTitle-error" aria-live="polite" aria-atomic="true">
                {state.errors?.closingHymnTitle?.map((error) => (
                  <p key={error} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
              </div>
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium " htmlFor="closingPrayer">
                  Closing Prayer<span className="text-red-500">*</span>
                </label>
                <textarea
                  id="closingPrayer"
                  name="closingPrayer"
                  rows={2}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                <div id="closingPrayer-error" aria-live="polite" aria-atomic="true">
                {state.errors?.closingPrayer?.map((error) => (
                  <p key={error} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
              </div>
              </div>
            </div>
          </section>

          {state.message ? <p className="text-sm text-red-600">{state.message}</p> : null}

          <div className="flex justify-end gap-3">
            <Link
              href="/meetings"
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-accent"
              disabled={isPending}
            >

              {isPending ? 'Saving...' : 'Save Meeting'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}