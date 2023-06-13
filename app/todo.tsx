"use client"

import { Database } from '@/lib/database.types'
import React, { useTransition } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function Todo({ todo, index }: { index: number, todo: Database["public"]["Tables"]["todos"]["Row"] }) {

    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const supabase = createClientComponentClient()

    const markAsCompelete = async (id: number) => {

        console.log("Updating  : ", 1)

        const { error, data } = await supabase
            .from('todos')
            .update({ completed: true })
            .eq('id', id)

        console.log("error : ", error)
        console.log("data : ", data)
        router.refresh()

    }

    const deleteTodo = async (id: number) => {

        console.log("Deleting : ", 1)

        const supabase = createClientComponentClient()
        const { error, data } = await supabase
            .from('todos')
            .delete()
            .eq('id', id)

        console.log("error : ", error)
        console.log("data : ", data)
        router.refresh()

    }



    return (
        <div className=" bg-[#dedede] p-2 flex items-center justify-between">
            <p className={`${todo.completed ? "line-through" : ""}`}>{index + 1}. {todo.content}</p>
            <div className="flex items-center">
                {/* <div>
                    <input type="hidden" name="id" value={todo.id} />
                    <button
                        onClick={() => {
                            markAsCompelete(todo.id)
                        }}
                        type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                        Mark As Complete
                    </button>
                </div> */}

                {/* <div>
                    <input type="hidden" name="id" value={todo.id} />
                    <button
                        onClick={() => {
                            deleteTodo(todo.id)
                        }}
                        type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                        Delete
                    </button>
                </div> */}

            </div>
        </div>
    )
}
