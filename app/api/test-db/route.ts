import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(){
    try{
        await prisma.$queryRaw`SELECT 1`;
        
        return NextResponse.json({
            message: "Database connected successfully"
        });
    }catch(error){
        console.error("Database connection failed:", error);

        return NextResponse.json(
            {error: "Database connection failed"},
            {status: 500}
        );
    }
}

