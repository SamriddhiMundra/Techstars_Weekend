import Image from "next/image"
import React, {FunctionComponent} from "react";
import ecell from "@/public/assets/iitbhulogo.png";
import techstarsLogo from "@/public/Techstars_Logo_Primary_Black.png";
import Link from "next/link";
interface OwnProps {}
type Props = OwnProps;
export const Footer: FunctionComponent<Props> = (props) => {
    return (
        <div  className=" max-w-screen mt-4 md:mt-0">
            <hr className="shadow -mt-4"/>
           <div className="m-4 md:flex justify-evenly flex-wrap">
            <div>
                <div className="flex justify-center items-center">
                    <a
                target={"_blank"}
                href={"https://www.ecelliitbhu.com/"}
                className=" lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400"
            ><Image src={ecell} alt={"ecell logo"} height={100} width={100}  />
            </a>
            </div>
            </div>
            <div className="text-gray-500 text-xs sm:text-sm md:max-w-[60%]">By acquiring a ticket to a Techstars Startup Weekend event, you are agreeing to our <Link href="http://www.techstars.com/terms-of-use/" className="text-black font-medium" target="_blank">Terms of Use </Link> and <Link href="http://www.techstars.com/privacy-policy-4/" className="text-black font-medium" target="_blank">Privacy Policy </Link>. If you have questions please reach out to privacy@techstars.com.</div>
               <div>
                   <div className="flex justify-center items-center">
                       <a
                           target={"_blank"}
                           href={"https://www.techstars.com/"}
                           className=" lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400"
                       >
                       <Image src={techstarsLogo} alt={"techstarsLogo"} height={300} width={150}  />
                       </a>
                   </div>
               </div>
           </div>
        </div>
    )
}