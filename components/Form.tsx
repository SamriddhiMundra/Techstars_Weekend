"use client";
import React, { FunctionComponent, Suspense ,useState,useEffect} from "react";
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
interface OwnProps {}

type Props = OwnProps;
const FormSchema = z.object({
    firstname: z.string({required_error:"First Name is required"}).nonempty({ message: "First name is required" }),
    lastname: z.string({required_error:"Last Name is required"}).nonempty({ message: "Last name is required" }),
    phone:z.string({required_error:"Phone number required"}).min(10,{message:"10 digits"}).max(10,{message:"10 digits"}),
    location: z.string({required_error:"Location is required"}).min(3).max(50),
    linkedin: z.string({required_error:"LinkedIn Id is required"}).url({message:"Invalid LinkedIn URL"}),
    size:z.enum(["S","M","L","XL","2XL"],{
        required_error: "Select your t-shirt size .",
        invalid_type_error: "Select your t-shirt size",
    }),
    term:z.boolean({required_error:"terms is required"}).default(true),
})
export const FormComponent: FunctionComponent<Props> = (props) => {
    const { toast } = useToast()
    const { data: session, status } = useSession();
    const [userId,setUserId] =useState<string|null>(null);
    const route = useRouter()

    useEffect(()=>{
        const fetcher = async ()=>{
            const  q= query(collection(db,"users"),where("email","==",session?.user?.email));
             const querySnapshot = await getDocs(q);
             setUserId(querySnapshot.docs[0].id)
        }
        fetcher();
    },[session])
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            size: "M",
           term: true,
        },
    })
    const handleSubscription = async () => {
        let price =process.env.PRICEID;
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
           if(userId){
               const ref = doc(db, "users", userId);
              await  updateDoc(ref,values);

               toast({
                   description: "Submitted successfully !!",
               })
               route.push("/payment");
           }
        }
        catch (error){
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    }
    return (
        <div className="max-w-full max-h-full p-2"> <h1 className="text-4xl font-semibold text-center pb-2">Fill the Form</h1>
            <Card className={"min-w-max p-6"}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Last name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="location" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="linkedin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>LinkedIn URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="LinkedIn URL" {...field} />
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
                                    <FormLabel>T-shirt Size</FormLabel>
                                    <div className="relative w-max">
                                        <FormControl>
                                            <select
                                                className={cn(
                                                    buttonVariants({ variant: "outline" }),
                                                    "w-[200px] appearance-none bg-transparent font-normal"
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
                                        <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50" />
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
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none max-w-lg">
                                    <FormLabel>
                                        Terms and conditions
                                    </FormLabel>
                                    <FormDescription>
                                        By acquiring a ticket to a Techstars Startup Weekend event, you are agreeing to our <Link href="http://www.techstars.com/terms-of-use/" className="text-black font-medium" target="_blank">Terms of Use </Link> and <Link href="http://www.techstars.com/privacy-policy-4/" className="text-black font-medium" target="_blank">Privacy Policy </Link>. If you have questions please reach out to privacy@techstars.com.
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </Card>
        </div>
    );
};
