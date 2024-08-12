import { Metadata } from "next"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Icons } from "@/components/icons"

export const metadata: Metadata = {
    title: "Attendee form",
}

interface SettingsLayoutProps {
    children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <div className="w-full h-full mb-10">
                    <Link
                        href="/"
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "relative left-4 top-4 mx-4 mt-4 mb-8 md:left-10 md:top-8"
                        )}
                    >
                        <>
                            {/* eslint-disable-next-line react/jsx-no-undef */}
                            <Icons.chevronLeft className="mr-1 h-4 w-4 " />
                            Back
                        </>
                    </Link>
                    {children}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}
