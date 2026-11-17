import Link from "next/link"
import { useEffect, useState } from "react";

export default function projectDetail() {
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
        </div>
    )
}