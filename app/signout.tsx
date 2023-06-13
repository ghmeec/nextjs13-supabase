"use client"

import React from 'react'
import { Database } from '@/lib/database.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';

export default function Signout() {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()

    const handleSignOut = async () => {
        try {
            await supabase.auth.signOut()
            toast.success("successfully signed out. Redirecting")
        } catch (e) {

        } finally {

        }
        router.refresh()
    }

    return (
        <div>
            <button
                onClick={handleSignOut}
                className="bg-red-500 text-white px-6 py-2"
            >
                Sign out
            </button>
        </div>
    )
}
