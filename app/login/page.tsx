'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

    return (
      <main className="flex-1">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <h2>Sign In</h2>
        <form action={formAction}>
            <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
                <input id="email" type="email" name="email" required className="w-full rounded-md border border-gray-300 px-3 py-2" />
            </div>
            <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium">Password</label>
                <input id="password" type="password" name="password" minLength={6} required className="w-full rounded-md border border-gray-300 px-3 py-2" />
            </div>
            <button aria-disabled={isPending} type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-accent">
                {isPending ? 'Signing in...' : 'Sign In'}
            </button>
            {errorMessage && <p role="alert">{errorMessage}</p>}
            </form>
        </div>
        </main>
  );
}