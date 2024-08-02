"use client";
import React, {useState,useEffect} from "react";
import Link from "next/link";
import {useSession} from "next-auth/react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Check, ChevronDown, ChevronsUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import {useRouter} from "next/navigation";
import techstarsLogo from "@/public/assets/gswvaranasi.jpg";
import ecell from "@/public/assets/iitbhulogo.png";
import Image from "next/image";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { db } from "@/lib/firebaseStore";
import {query,where,collection,getDocs,doc,updateDoc} from "firebase/firestore";
import axios from "axios";
interface FormComponentProps {
    userId: string;
  }
const FormSchema = z.object({
    firstname: z.string({required_error:"This field is required"}).nonempty({ message: "First name is required" }),
    lastname: z.string({required_error:"This field is required"}).nonempty({ message: "Last name is required" }),
    email:z.string({required_error:"This field is required"}).nonempty({ message: "Email id is required" }),
    phone:z.string({required_error:"This field is required"}).min(10,{message:"10 digits"}).max(10,{message:"10 digits"}),
    location: z.string({required_error:"This field is required"}).min(3).max(50),
    linkedin: z.string().optional(),
    size:z.enum(["S","M","L","XL","2XL"],{
        required_error: "Select your t-shirt size .",
        invalid_type_error: "Select your t-shirt size",
    }),
    term:z.boolean({required_error:"terms is required"}).default(true),
})
const FormComponent: React.FC<FormComponentProps> = ({ userId }) => {
    const { toast } = useToast()
    const { data: session, status } = useSession();
    const route = useRouter()


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            size: "M",
           term: true,
           email: session?.user?.email || "", 
           linkedin:""
        },
    })
    const username=session?.user?.name||"";

    const handleSubscription = async () => {
        let price =process.env.NEXT_PUBLIC_PRICEID;
        const { data } = await axios.post('https://www.startupweekendvaranasi.com/api/payment',
            {
                priceId:price,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        window.location.assign(data)
    }
    async function onSubmit(values: z.infer<typeof FormSchema>) {
       try {
        console.log("inside")
               const ref = doc(db, "users", userId);
               const updatedValues = {
                ...values, 
                formFilled: true
            };
              await  updateDoc(ref,updatedValues);
              
              console.log(updateDoc)
               toast({
                   description: "Submitted successfully !!",
               })
               route.push("/payment");
           
        }
        catch (error){
            console.log(error)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    }

    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    return (
        <div className="max-w-full max-h-full py-3 px-3 md:shadow-green rounded-xl bg-background">
            <div>
                    <h1 className="text-2xl sm:text-2xl md:text-3xl font-semibold text-stone-600 text-center mt-8">Welcome, {username}!</h1>
                </div>
            <div className="flex justify-center items-center md:gap-8 sm:gap-3 gap-2">
                
              <Image src={ecell} alt={"ecell IITBHU"} height={170} width={85} className="hidden sm:block" /> 
              <h1 className="text-2xl sm:text-2xl md:text-3xl font-semibold text-stone-700 text-center">Fill the form to purchase ticket.</h1>
              <Image src={techstarsLogo} alt={"techstarsLogo"} height={170} width={85} className="hidden sm:block" /> 
            </div>
            <Card className={"max-w-full sm:px-3 px-3 md:px-6 py-6 bg-background"}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                                <span className="flex space-x-2 items-center">
                                <FormLabel className="text-primary">First name<span className="text-red-500"> *</span></FormLabel>
                                <FormMessage />
                                </span>
                                <FormControl>
                                    <Input placeholder="Name" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                                <span className="flex space-x-2 items-center">
                                <FormLabel className="text-primary">Last name<span className="text-red-500"> *</span></FormLabel>
                                <FormMessage />
                                </span>
                                <FormControl>
                                    <Input placeholder="Last name" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <span className="flex space-x-2 items-center">
                                <FormLabel className="text-primary">Email address<span className="text-red-500"> *</span></FormLabel>
                                <FormMessage />
                                </span>
                                <FormControl>
                                    <Input type="email"  placeholder="Email Address" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <span className="flex space-x-2 items-center">
                                <FormLabel className="text-primary">Phone Number<span className="text-red-500"> *</span></FormLabel>
                                <FormMessage />
                                </span>
                                <FormControl>
                                    <Input type="number" placeholder="Phone number" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <span className="flex space-x-2 items-center">
                                <FormLabel className="text-primary">Location(city/country)<span className="text-red-500"> *</span></FormLabel>
                                <FormMessage />
                                </span>
                                <FormControl>
                                    <Input placeholder="location" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="linkedin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary">LinkedIn URL (if applicable) </FormLabel>
                                <FormControl>
                                    <Input  placeholder="LinkedIn URL" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="size"
                        render={({ field }) => (
                            <>
                                <FormItem >
                                    <FormLabel className="text-primary">T-shirt Size</FormLabel>
                                    <div className="relative w-max">
                                        <FormControl>
                                            <select
                                                className={cn(
                                                    buttonVariants({ variant: "outline" }),
                                                    "w-[180px] appearance-none bg-transparent font-normal"
                                                )}
                                                {...field}
                                            >
                                                <option value={"S"}>S</option>
                                                <option value={"M"}>M</option>
                                                <option value={"L"}>L</option>
                                                <option value={"XL"}>XL</option>
                                                <option value={"2XL"}>2XL</option>
                                            </select>
                                        </FormControl>
                                        <ChevronDown className="absolute right-3 top-3 h-3 w-3 opacity-50" />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />
                    <FormField
                            control={form.control}
                            name="term"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-3 border px-3 py-2 rounded-xl">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-2 leading-none max-w-lg flex-1">
                                        <div className="flex items-center justify-between">
                                            <FormLabel className="text-primary flex-1">
                                                Terms and conditions<span className="text-red-500"> *</span>
                                            </FormLabel>
                                            <button
                                                type="button"
                                                className="ml-2"
                                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                            >
                                                <ChevronDown className={`transition-all transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                                            </button>
                                        </div>
                                        
                                            <div className={`transition-max-height duration-400 overflow-hidden ${dropdownOpen ? 'max-h-48': 'max-h-0'}`}>
                                            <FormDescription className="leading-snug">
                                                By acquiring a ticket to a Techstars Startup Weekend event, you are agreeing to our <Link href="http://www.techstars.com/terms-of-use/" className="text-black font-medium hover:text-primary" target="_blank">Terms of Use </Link> and <Link href="http://www.techstars.com/privacy-policy-4/" className="text-black font-medium hover:text-primary" target="_blank">Privacy Policy </Link>. If you have questions please reach out to privacy@techstars.com.
                                            </FormDescription>
                                            </div>
                                        
                                    </div>
                                </FormItem>
                            )}
                        />
                    <div className="flex space-x-5">
                        <Button type="submit">Submit</Button>
                        <Button type="button" variant="reset" onClick={() => form.reset()}>Reset</Button>
                    </div>
                </form>
            </Form>
        </Card>
        </div>
    );
};
export default FormComponent;