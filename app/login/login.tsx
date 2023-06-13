"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Auth } from '@supabase/auth-ui-react'
import {
    // Import predefined theme
    ThemeSupa,
} from '@supabase/auth-ui-shared'
import { redirect } from 'next/navigation'


const Login = async () => {
    const supabase = createClientComponentClient()

    const { data: { session } } = await supabase.auth.getSession()

    console.log("session")
    console.log(session)

    if (session) {
        redirect("/")
    }

    return (
        <div className="min-h-screen">
            <div className="max-w-3xl mx-auto p-3">
                <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    redirectTo="/"
                />
            </div>

        </div>
    )
}

export default Login
