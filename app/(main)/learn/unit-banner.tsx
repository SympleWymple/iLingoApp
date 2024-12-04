import { Button } from "@/components/ui/button"
import { Description } from "@radix-ui/react-dialog"
import { Notebook} from "lucide-react"
import Link from "next/link"

type Props = {
    title: string,
    description: string,
}

export const UnitBanner = ({title, description}: Props) => {
    return (
        <div className="w-full rounded-xl bg-green-500 p-5 text-white flex items-center justify-between">
            <div className="space-y">
                <h3 className="text-xl font-bold text-neutral-100/70">{title}</h3>
                <p className="text-2xl font-black"> {description} </p>
            </div>
            <Link href="/lesson">
                <Button size="lg" variant="secondary" className="hidden xl:flex border-2 border-b-4 active:border-b-2 text-pretty text-sm text-neutral-50" >
                    <Notebook className="mr-2" />
                    guidebook
                </Button>
            </Link>
        </div>
    )
}