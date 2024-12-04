import { StickyWarapper } from "@/components/sticky-wrapper"
import { FeedWrapper } from "@/components/feed-wrapper"
import { Header } from "./header"
import { UserProgress } from "@/components/user-progress"
import { getUnits, getUserProgress } from "@/db/queries"
import { redirect } from "next/navigation"
import { Unit } from "./unit"

const LearnPage = async () =>{
    const userProgressPromise = getUserProgress()
    const unitDataPromise = getUnits()

    const [
        userProgress,
        unitsData
    ] = await Promise.all([
        userProgressPromise,
        unitDataPromise
    ]);

    if (!userProgress || !userProgress.activeCourse){
        redirect("/courses")
    }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6 bg-duolingo">
            <StickyWarapper>
                <UserProgress activeCourse={userProgress.activeCourse} hearts={userProgress.hearts} points={userProgress.points} hasActiveSubscription={false}/>
            </StickyWarapper>
            <FeedWrapper>
              <Header title={userProgress.activeCourse.title}/>
              {unitsData.map((unit) => (
                <div key={unit.id} className="mb-10">
                    <Unit
                        id = {unit.id}
                        order = {unit.order}
                        description = {unit.description}
                        title = {unit.title}
                        lessons = {unit.lessons}
                        activeLesson = {undefined}
                        activelessonPercentage = {0}
                    />
                </div>
            ))}
            </FeedWrapper>
        </div>
    )
}

export default LearnPage