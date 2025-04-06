"useclient"
import React from "react"

type lpTextproups = {
    title_num:string
    title:string
    text:string
}
export default function Lptext({title_num,title,text}:lpTextproups){
    return(
    <div className="w-fit max-w-[500px] space-y-35.5">
        <div className="text-left">
            <h1 className="text-base-text text-5xl font-bold">{title_num}</h1>
            <h2 className="text-base-text text-4xl leading-[2] font-bold">{title}</h2>
            <div className="text-base-text leading-[2] text-xl font-bold">
                <p>{text}</p>
            </div>
        </div>
    </div>
    )
}