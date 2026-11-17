"use client";

import Link from "next/link"
import { useEffect, useState } from "react";

type Project = {
    id: number;
    name: string;
    createdAt: string;
}

export default function AllProjects() {

    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        async function loadProjects() {
            const response = await fetch("/api/projects");
            const data = await response.json();
            setProjects(data);
        }
        loadProjects();
    }, []);

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
                <h1 className="font-bold text-2xl">Projects</h1>
                <div className="space-y-3">
                    <div
                        className="grid grid-cols-[1.0fr_2.0fr_1fr] items-center bg-zinc-800 p-4 rounded-lg text-white">
                        <span>Project ID</span>
                        <span>Project Name</span>
                        <span>Created At</span>
                    </div>
                    {
                        projects.map((project) => {
                            const date = new Date(project.createdAt).toLocaleString("ja-JP");
                            return (
                                <div key = {project.id}
                                    className="hover:bg-zinc-900 transition-colors duration-200 grid grid-cols-[1.0fr_2.0fr_1fr] items-center bg-zinc-800 p-4 rounded-lg text-white">
                                    <span>{project.id}</span>
                                    <span>{project.name}</span>
                                    <span className="text-sm text-zinc-400">{date}</span>
                                </div>
                            );
                        })
                    }
                </div>
            </main>
        </div>
    )
}