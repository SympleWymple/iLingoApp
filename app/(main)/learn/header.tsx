import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

type Props = {
    title: string
}

export const Header = ({title}: Props) =>{
    return (
        <div className="sticky top-0 bg-duolingo pb-3 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-between border-b-2 mb-5 text-neutral-50 lg:z-50">
            <Link href="/courses">
                <Button variant="ghost" size="sm">
                    <ArrowLeft className="h- w-5 stroke-2 text-neutral-50" />
                </Button>
            </Link>
            <h1 className="font-bold text-lg">
                {title}
            </h1>
            <div />
        </div>
    )
}