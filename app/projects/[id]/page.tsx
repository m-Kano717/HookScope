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
        },
        include: {
            events: {
                select: {
                    id: true,
                    method: true,
                    endpoint: true
                }
            }
            
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
            <main className="flex-auto bg-zinc-700 p-6">
                <h1>Project Detail</h1>
                <div className = "block p-2 bg-zinc-500 rounded-md text-xl my-4">
                    <h3>Project ID: {id}</h3>
                    <h3>Project Name: {project.name}</h3>
                </div>
                {
                    project.events.map((event) => (
                            <div key = {event.id}
                                className="hover:bg-zinc-900 transition-colors duration-200 grid grid-cols-[1.0fr_2.0fr_1fr] items-center bg-zinc-800 p-4 rounded-lg text-white">
                                <span>{event.id}</span>
                                <span>{event.method}</span>
                                <span>{event.endpoint}</span>
                            </div>
                    ))
                }
            </main>
        </div>
    )
}