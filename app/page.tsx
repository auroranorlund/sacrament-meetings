import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1">
    <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Sacrament Meeting Planner</h2>
        <p className="my-4">
        <Link href="/meetings" className="text-accent text-2xl font-bold hover:underline">
            View Current Sunday
          </Link>
        </p>
        <p className="my-4">
        <Link href="/meetings" className="text-accent text-2xl font-bold hover:underline">
            View Past Meetings
          </Link>
          </p>
      </div>
    </main>
  );
}