'use client'

export default function UserDetails(){
    return(
        <div className="bg-adminBg w-full h-screen md:px-96 md:py-28 ">
            <div className="rounded-lg flex-grow w-full h-full flex overflow-hidden">
                <div className="w-1/3 h-full bg-yellow-400"></div>
                <div className="w-2/3 h-full bg-red-400"></div>
            </div>
        </div>
    )
}