import Link from 'next/link';

export default function notFound() {
  return (
    <main className="flex-1">
    <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Meeting Not Found</h2>
              <p>The meeting you are looking for does not exist.</p> 
              
        <Link href="/meetings" className="text-accent text-2xl font-bold hover:underline">
            Return to meetings
          </Link>
      </div>
    </main>
  );
}