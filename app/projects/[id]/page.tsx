import Link from "next/link"
import {notFound} from "next/navigation";
import {prisma} from "@/lib/prisma";

export const instant = false;

type Props = {
    params: Promise<{
        id: string;
    }>;
}

export default async function projectDetail({params}: Props) {

    const {id} = await params;

    const project = await prisma.project.findUnique({
        where: {
            id: Number(id)
        }
    });

    if(!project){
        notFound();
    };

    return (
        <div className="flex min-h-screen">
            <aside className="w-50 bg-zinc-900 text-white p-6">
                <h2>HookScope</h2>
                <ul className="space-y-4">
                    <li className="hover:bg-zinc-800 rounded-md p-2">
                        <Link href="/" className="block">
                            Dashboard
                        </Link>
                    </li>
                    <li className="hover:bg-zinc-800 rounded-md p-2">
                        Events
                    </li>
                    <li className="hover:bg-zinc-800 rounded-md p-2">
                        <Link href="/projects" className="block">
                            Projects
                        </Link>
                    </li>
                </ul>
            </aside>
            <main>
                <h1>Project Detail</h1>
                <h3>Project ID: {id}</h3>
                <h3>Project Name: {project.name}</h3>
            </main>
        </div>
    )
}