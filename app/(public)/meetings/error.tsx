// /projects/error.tsx
'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({ 
  error,
  reset
}: { 
  error: Error & { digest: string };
  reset: () => void 
}) {
  useEffect(() => {
    console.error('An uncaught error occurred:', error);
  }, [error]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">Something went wrong!</h1>
      <p className="mt-3">An unexpected error occurred. Please try again later.</p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          onClick={reset}
          className="text-accent text-2xl font-bold hover:underline"
        >
          Try Again
        </button>
        <Link
          href="/meetings"
          className="text-accent text-2xl font-bold hover:underline"
        >
          Go Back to Meetings
        </Link>
      </div>
    </div>
  );
}