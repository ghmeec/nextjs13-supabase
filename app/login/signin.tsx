'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { Database } from '@/lib/database.types'

export default function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const supabase = createClientComponentClient<Database>()

    const handleSignUp = async () => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name: 'George Millanzi',
                    age: 27,
                },
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        })
        if (error) {
            console.log("error occured")
            console.log(error?.error_description)
            return
        }
        router.refresh()
    }

    const handleSignIn = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) {
            console.log("error occured")
            console.log(error)
            return
        }
        router.refresh()
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="bg-white w-1/2  mx-auto border border-slate-900 p-4">
                <div>
                    <label htmlFor="email">Email</label>
                    <input name="email" onChange={(e) => setEmail(e.target.value)} value={email}
                        className="py-3 px-4 block w-full bg-gray-200 border-gray-200 rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    />
                </div>
                <div className='mt-2'>
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className='py-3 px-4 block w-full bg-gray-200 border-gray-200 rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400'
                    />
                </div>
                <div className="mt-4 space-x-2">
                    <button onClick={handleSignUp} className="bg-blue-700 text-white px-6 py-2">Sign up</button>
                    <button onClick={handleSignIn} className="bg-blue-700 text-white px-6 py-2">Sign in</button>
                </div>

            </div>

        </div>

    )
}