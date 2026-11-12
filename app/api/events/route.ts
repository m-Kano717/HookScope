import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function GET(){
    const events = await prisma.event.findMany({
        orderBy: {
            receivedAt: "desc"
        },
        select: {
            id: true,
            projectId: true,
            method: true,
            endpoint: true,
            receivedAt: true
        }
    });
    return NextResponse.json(events);

}