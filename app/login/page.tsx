import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Login from './login'
import Signin from './signin'
import { Database } from '@/lib/database.types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function page() {

    const supabase = createServerComponentClient<Database>({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    console.log("session")
    console.log(session)

    if (session) {
        redirect("/")
    }

    return (
        <div>
            <Signin />
        </div>
    )
}
