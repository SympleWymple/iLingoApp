"use server"

import { getCourseById, getUserProgress } from "@/db/queries"
import { auth, currentUser } from "@clerk/nextjs/server"
import db from "@/db/index"
import * as schema from "@/db/schema"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const upsertUserProgress = async (courseId: number) => {
    const {userId} = await auth()
    const user = await currentUser()

    if (!userId || !user) {
        throw new Error("User not authorized")
    }

    const course = await getCourseById(courseId)

    if (!course) {
        throw new Error("Course not found")
    }

    // if (!course.units.length || !course.units[0].lessons.length) {
    //     throw new Error("Course does not contain units or lessons")
    // }
    const existingUserProgress = await getUserProgress()
    
    if (existingUserProgress) {
        console.log(existingUserProgress)
        await db.update(schema.userProgress).set({
            activeCourseId: courseId,
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || "/mascot.png",
        })

        revalidatePath("/courses")
        revalidatePath("/learn")
        redirect("/learn")
    }

    await db.insert(schema.userProgress).values({
        userId,
        activeCourseId: courseId,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "/mascot.png",
    })

    revalidatePath("/courses")
    revalidatePath("/learn")
    redirect("/learn")
}