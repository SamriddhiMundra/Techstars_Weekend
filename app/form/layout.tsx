import { Metadata } from "next"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Icons } from "@/components/icons"

export const metadata: Metadata = {
    title: "form",
}

interface SettingsLayoutProps {
    children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <div className="w-full h-full">
                    <Link
                        href="/"
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "relative left-4 top-4 m-4 md:left-12 md:top-8"
                        )}
                    >
                        <>
                            {/* eslint-disable-next-line react/jsx-no-undef */}
                            <Icons.chevronLeft className="mr-2 h-4 w-4" />
                            Back
                        </>
                    </Link>
                    {children}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}
