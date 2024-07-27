import Image from "next/image"
import React,{FunctionComponent}from 'react'
import {ListOfJudges} from "@/lib/samplejudges.js"



interface OwnProps {}

type Props = OwnProps;
export const Judges: FunctionComponent<Props> = (props) => {
    return (
        <div  className="mt-7 max-w-screen">
            <div className="font-semibold text-2xl text-black uppercase text-center mb-7">Judges</div>
            <div className="flex flex-wrap justify-center items-center   " >
                {
                    ListOfJudges?.map((data,index)=>
                        // <div className=" mt-7 m-2 flex justify-center items-center h-40 rounded-lg p-2 " key={index}>
                    <div className=" rounded-lg  mt-7 mr-5 mb-7  shadow lg:mb-0 flex flex-col justify-center items-center  hover:text-gray-800 dark:hover:text-gray-400 "key={index}>
                            <div className=" flex-col justify-center items-center text-center">
                            
                              <Image src={data.src} alt={data.alt} height={200} width={200} className="mr-5 mb-4 "></Image>  
                              <h2 className=" lg:mb-0 mb-4 font-semibold text-xl">{data.head}</h2>
                              </div>
                              <div className=" mb-5 lg:mb-0 p-5 mt-0 max-w-xs text-center min-w-min">{data.info}</div>
                              </div>
                            
                               
                              
                            
                        
                    )
                }
            </div>
        </div>
    )
}