import { prisma } from "@/lib/prisma";
import {createHash} from "node:crypto";
import {NextResponse} from "next/server";

export async function POST(
    request: Request,
    {params}: {params: Promise<{token: string}>}
){
    const bodyRaw = await request.text();
    const headers = Object.fromEntries(request.headers.entries());
    const sensitiveHeaders = [
        "authorization",
        "cookie",
        "set-cookie",
        "x-api-key"
    ];
    for (const key of Object.keys(headers)) {
        if(sensitiveHeaders.includes(key.toLowerCase())){
            headers[key] = "[REDACTED]";
        };
    }
    const {token} = await params;
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const project = await prisma.project.findUnique({
        where: {
            endpointTokenHash: tokenHash
        }
    });
    if (!project) {
        return NextResponse.json(
            { error: "Invalid receiver token" },
            { status: 404 }
        );
    };
    const event = await prisma.event.create({
        data: {
            projectId: project.id,
            method: request.method,
            endpoint: "/api/ingest/[token]",
            headers: headers,
            bodyRaw: bodyRaw
        }
    });
    return NextResponse.json(
        {
            message: "EventReceived",
            eventId: event.id
        },
        {status: 201}
    );
}