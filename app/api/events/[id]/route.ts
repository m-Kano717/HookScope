import { prisma } from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function GET(
    request: Request,
    {params}: {params: Promise<{id: string}>}
){
    const {id} = await params;
    const eventId = Number(id);
    if(! Number.isInteger(eventId) || eventId < 1){
        return NextResponse.json(
            {
                message: "不正なID",
            },
            {
                status: 400
            }
        );
    };
    const event = await prisma.event.findUnique({
        where: {
            id: eventId
        }
    });
    if(!event){
        return NextResponse.json(
            {
                message: "Event not found"
            },
            {
                status: 404
            }
        );
    };
    return NextResponse.json(event);
}