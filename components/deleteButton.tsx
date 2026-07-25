'use client';

import { deleteMeetingAction } from "@/lib/actions";

interface DeleteButtonProps {
  id: number;
}

export default function DeleteButton({ id }: DeleteButtonProps) {
    const deleteMeetingActionWithId = deleteMeetingAction.bind(null, id);
    return (
    <button
        formAction={deleteMeetingActionWithId}
        className="rounded-md bg-red-600 px-4 py-2 my-5 text-sm font-medium text-white hover:bg-red-700"
              >
    Delete Meeting
        </button>
    )
}