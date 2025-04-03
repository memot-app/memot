"useclient"
import { title } from "process"
import React from "react"
import { text } from "stream/consumers"

type lpTextproups = {
    title_num:string
    title:string
    text:string
}
export default function Lptext({title_num,title,text}:lpTextproups){
    return(
    <div className="w-fit ml-auto space-y-35.5">
        <div className="text-left">
            <h1 className=" text-black text-3xl ">{title_num}</h1>
            <h2 className=" text-black text-3xl leading-[2]">{title}</h2>
            <div className="leading-[3] text-sm ">
                <p>{text}</p>
               
            </div>
        </div>
    </div>
    )
}