import React, { FunctionComponent } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
interface Detail {
    title:string,
    desc:string
}
const detail:Detail[] = [
    {
        title:"Connect with other creators",
        desc :"Connect with other passionate people driven to build something new. Rich and diverse talent is a Techstars staple. There is no better place to meet new friends, colleagues, mentors or co-founders and investors."
    },
    {
        title:"Learn from the best" ,
        desc: "Learn what it really takes to innovate, disrupt and start a company from people who’ve been there. It’s deep experiential learning guided by an experienced hand.",
    },
    {
        title:"Start Something great" ,
        desc: "Techstars Startup Weekend is designed to get you going. Fast. Your local organizers will set up the ideal environment for you to be successful and learn as much as possible in just 54 hours.",
    },
    {
        title:"Take it deep" ,
        desc: "Sometimes what you really need is to go to the next level. Startup Weekend also goes deep on specific topics or skill sets. Just what you need to progress quickly.",
    }
]
interface OwnProps {}
type Props = OwnProps;

const WhyStartupWeekend: FunctionComponent<Props> = () => {
  return ( <div className="w-full">
      <h1 className="mb-4 text-2xl text-center font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Why Startup Weekend
      </h1>
      <div className="flex flex-wrap justify-center">
      {
          detail.map((data,index)=>{
             return(<Card key={index} className="max-w-sm m-4 transition ease-in-out hover:scale-110">
                      <CardHeader>
                          <CardTitle>{data.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <p> {data.desc}</p>
                      </CardContent>
                  </Card>)
          })
      }
      </div>
  </div>);

};

export default WhyStartupWeekend;