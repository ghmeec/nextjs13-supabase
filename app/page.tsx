import { Database } from '@/lib/database.types'
import { createServerActionClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import Signout from './signout'
import { revalidatePath } from 'next/cache'
import Todo from './todo'

export default async function Home() {

  const supabase = createServerComponentClient<Database>({ cookies })

  async function markAsCompelete(formData: FormData) {
    "use server"

    const { id } = Object.fromEntries(formData.entries())
    console.log("passed in id complete : ", id)

    const supabase = createServerActionClient({ cookies })
    const { error, data } = await supabase
      .from('todos')
      .update({ completed: true })
      .eq('id', id)

    console.log("error : ", error)
    console.log("data : ", data)

    revalidatePath("/")

  }

  async function deleteTodo(formData: FormData) {
    "use server"

    const { id } = Object.fromEntries(formData.entries())

    console.log("passed in id delete : ", id)

    const supabase = createServerActionClient({ cookies })

    const { error, data } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)

    console.log("error : ", error)
    console.log("data : ", data)
    revalidatePath("/")

  }


  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  const { data, error } = await supabase
    .from("todos")
    .select()

  console.log("data")
  console.log(data)


  return (
    <div className="bg-[#f5f5f5] ">
      <div className="max-w-5xl min-h-screen p-4 mx-auto bg-white border-[#cecece]">
        <Signout />
        <div className="mt-4">
          {/* <pre>{JSON.stringify(data, null, 3)}</pre> */}
          <div className="space-y-2">
            {data?.map((todo: Database["public"]["Tables"]["todos"]["Row"], index: number) => {
              return (
                <div className="bg-[#dedede] p-2">
                  <Todo todo={todo} index={index} />

                  <div className="flex items-center space-x-4">

                    <form action={markAsCompelete}>
                      <input type="hidden" name="id" value={todo.id} />
                      <button
                        type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-sm border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                        Mark As Complete
                      </button>
                    </form>


                    <form action={deleteTodo}>
                      <input type="hidden" name="id" value={todo.id} />
                      <button
                        type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-sm border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                        Delete
                      </button>
                    </form>

                  </div>

                </div>

              )
            })}
          </div>
        </div>
      </div>

    </div>
  )
}
