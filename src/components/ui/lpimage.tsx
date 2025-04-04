"useclient"
import React from "react"
import Image from 'next/image';

type lpTextproups={
    image:string
}

export default function Lptext({image}:lpTextproups){
    return(
        <div className="flex flex-col space-y-8">
            <div className="w-80 h-102 bg-[#5db53e] rounded-3xl flex items-center justify-center ">
                <Image src={image} alt="Webut Logo" width={160} height={160} />
            </div>
        </div>
    )
}