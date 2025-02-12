'use client'

import { fetchUsers } from "@/service/fetch/fetch"
// import { SignIn } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"

export default function temp (){
    // const {data, isLoading, error} = useQuery({
    //     queryKey:['users'],
    //     queryFn:fetchUsers
    // })
    // if(isLoading) return <p>Loading</p>

    // if(error) return <p>Erro:{error.message}</p>
    return (
        <>
        <div>
            {/* {data?.map((item: {id: number; name: string})=>(
                  <li key={item.id}>{item.name}</li>
            ))} */}
            {/* <p>hello</p> */}
            {/* <SignIn /> */}
        </div>
        </>
    )
}