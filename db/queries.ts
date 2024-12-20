import { cache } from "react";
import * as schema from "./schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import db from "@/db/index"

export const getUserProgress = cache(async () => {
    const {userId} = await auth()
    if (!userId) {
        return null;
    }

    const data = await db.query.userProgress.findFirst({
        where: eq(schema.userProgress.userId, userId),
        with: {
            activeCourse: true,
        }
    })
    return data
})

export const getUnits = cache(async () => {
    const {userId} = await auth()
    const userProgress = await getUserProgress()

    if(!userId || !userProgress?.activeCourseId) {
        return [];
    }

    const data = await db.query.units.findMany({
        where: eq(schema.units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                with: {
                    challenges: {
                        with: {
                            challengeProgress: {
                                where: eq(schema.challengeProgress.userId, userId)
                            }
                        }
                    }
                }
            }
        }
    })

    const normaliseData = data.map((unit) => {
        const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
            const allCompletedChallenges = lesson.challenges.every((challenge) => {
                return challenge.challengeProgress && challenge.challengeProgress.length > 0 && challenge.challengeProgress.every((progress) => progress.completed)
            })

            return {...lesson, completed: allCompletedChallenges}
        })
        return {...unit, lessons: lessonsWithCompletedStatus}
    })
    return normaliseData
})

export const getCourses = cache(async () =>{
  const data = await db.query.courses.findMany();
    return data
})

export const getCourseById = cache(async (courseId: number) => {
    const data = await db.query.courses.findFirst({
        where: eq(schema.courses.id, courseId),
    })
    return data
})