"use client"

export default function InviteButton({ handleSetInvite }) {
    return (
        <button
            type="button"
            onClick={() => handleSetInvite()}
            className="rounded-md bg-secondary px-3 py-2 mb-6 text-sm font-semibold text-white shadow-sm hover:shadow-md"
        >
            Add Invite
        </button>
    )

}