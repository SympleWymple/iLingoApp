"use client"
import { courses, userProgress } from "@/db/schema"
import {Card} from "./card"
import { toast } from "sonner";
import { getUserProgress } from "@/db/queries";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { upsertUserProgress } from "@/actions/user-progress";
type Props = {
    courses: typeof courses.$inferSelect[];
    activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
}

export const List = ({ courses, activeCourseId }: Props) => {
    console.log(courses, activeCourseId)
    const router = useRouter();
    const [pending, startTransition] = useTransition()

    const onClick = (id: number) => {
        if (pending) { 
            console.log("pending") 
            return
        };
       console.log(activeCourseId)
        console.log("working")
        if (id === activeCourseId) {
            return router.push("/learn")
        }

        startTransition(() => {
            upsertUserProgress(id).catch(() => toast.error("Something went wrong."))
        });
    }
    return (
        <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
            {courses.map((course) => (
                <Card 
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    imageSrc={course.imageSrc}
                    onClick={onClick}
                    disabled={false}
                    active={course.id === activeCourseId}
                />
            ))}
        </div>
    )
}