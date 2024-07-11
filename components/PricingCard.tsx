import axios from "axios"
import Link from "next/link"
import Image from "next/image"
import TechstarStartupWeekend from "@/public/assets/gswvaranasi.jpg"
import { Button } from "@/components/ui/button";

//@ts-ignore
const PricingCard = ({price}) => {

// @ts-ignore
    const handleSubscription = async (e) => {
        e.preventDefault();
        const { data } = await axios.post('http://localhost:3000/api/payment',
            {
                priceId: price.id
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        
        window.location.assign(data)
    }
    
    return (
        <div className="border-gray-100 shadow-2xl border-1 text-center mt-10 max-w-[1040px] p-4 rounded-xl">
            <div>
                <div className="relative">
                    <div className="flex flex-col items-center justify-center ">
                            <Image src={TechstarStartupWeekend} alt={"TechstarStartupWeekend"} width={200} height={100}/>
                    </div>
                    <Button className="flex w-full justify-center rounded-md border border-transparent  py-2 px-4 text-sm font-medium text-white shadow-sm" onClick={handleSubscription}>
                        Get Ticket
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PricingCard