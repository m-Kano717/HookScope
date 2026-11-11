import { NextResponse } from "next/server";
import { createHash, randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request){
    const {name} = await request.json();
    if(!name || typeof name !== "string" || !name.trim()){
        return NextResponse.json(
            {error: "Project name is required"},
            {status: 400}
        );
    };
    const projectName = name.trim();
    const token = randomBytes(32).toString("hex");
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const project = await prisma.project.create({
        data: {
            name: projectName,
            endpointTokenHash: tokenHash
        },
    });
    const baseUrl = new URL(request.url).origin;
    const receiverUrl = `${baseUrl}/api/ingest/${token}`;
    return NextResponse.json(
        {
            message: "project created successfully",
            project: {
                id: project.id,
                name: project.name
            },
            receiverUrl,
        },
        {status: 201}
    );

}