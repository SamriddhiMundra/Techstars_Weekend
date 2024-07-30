import Image from "next/image"
import React,{FunctionComponent}from 'react'
import { FaLinkedin, FaTwitter,FaInstagram } from "react-icons/fa";
import {ListofJudges} from "@/lib/samplejudges.js"



interface OwnProps {}

type Props = OwnProps;
export const Judges: FunctionComponent<Props> = (props) => {
    return (
        <div  className="mt-7 max-w-screen ">
            <div className="font-semibold text-2xl text-black uppercase text-center mb-7">Judges</div>
            <div className="flex flex-wrap justify-around items-center   " >
                {
                    ListofJudges.map((data,index)=>
                        // <div className=" mt-7 m-2 flex justify-center items-center h-40 rounded-lg p-2 " key={index}>
                    <div className=" rounded-lg border h-auto border-box  mt-7 mr-10 mb-7  shadow lg:mb-0 flex flex-col justify-center items-center  hover:text-gray-800 dark:hover:text-gray-400 "key={index}>
                            <div className=" flex-col justify-center items-center text-center">
                            
                              <Image src={data.src} alt={data.alt} height={200} width={200} className="mr-5 mb-4 mt-5 "></Image>  
                              <h2 className=" lg:mb-0 mb-4 font-semibold text-xl">{data.head}</h2>
                              </div>
                              <div className=" mb-5 max-w-max lg:mb-0 p-5 mt-0 flex-col flex-wrap h- justify-center  content-center">
                               <div className="w-full text-center max-w-full sm:max-w-sm overflow-wrap break-word"> {data.info}</div> 
                              
                                <div className="flex justify-center" ><a 
                                  href={data.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                    <button className="w-10 h-10 mt-5 flex items-center justify-center rounded-lg bg-white shadow-md shadow-gray-200 group transition-all duration-300">
                                    <FaLinkedin  className="transition-all duration-300 group-hover:scale-150 "></FaLinkedin>
                                    </button>
                                    
                                </a>
                                </div>
                                </div>
                              
                              </div>
                            
                               
                              
                            
                        
                    )
                }
            </div>
        </div>
    )
}