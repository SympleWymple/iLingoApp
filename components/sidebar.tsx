import { cn } from "@/lib/utils"
import Image from "next/image"
import {SidebarItem} from "./sidebar-item"
import Link from "next/link"
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs"
import { Loader } from "lucide-react"
type Props ={
    className?: string
}
export const Sidebar = ({className}: Props) => {
    return (
        <div className={cn("flex  h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col", 
            className,
        )}>
            <Link href="/learn">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image src="/mascot.png" height={40} width={40} alt="Mascot"/> 
                     <h1 className = "text-2xl font-extrabold text-pink-600 tracking-wide">
                        iLingo
                    </h1>
                </div>
            </Link>
            <div className = "flex flex-col gap-y-2 flex-1">
                <SidebarItem label="Learn" href="/learn" iconSrc="/learn.svg"/>
                <SidebarItem label="Leaderboard" href="/leaderboard" iconSrc="/leaderboard.svg"/>
                <SidebarItem label="Quests" href="/quests" iconSrc="/quests.svg"/>
                <SidebarItem label="Shop" href="/shop" iconSrc="/shop.svg"/>
                <SidebarItem label="Settings" href="/settings" iconSrc="/settings.png"/>
            </div>
            <div className="p-4">
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton afterSignOutUrl="/"/>
                </ClerkLoaded>
            </div>
        </div>
    )
}