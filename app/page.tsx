"use client";

import { eventNames } from "process";
import { useState } from "react";
export default function Home() {
  const events = [
    {
      id: 1,
      method: "POST",
      endpoint: "/api/users",
      status: 200
    },
    {
      id: 2,
      method: "POST",
      endpoint: "/api/orders",
      status: 500
    },
    {
      id: 3,
      method: "POST",
      endpoint: "/api/payments",
      status: 200
    },
    {
      id: 4,
      method: "GET",
      endpoint: "/api/products",
      status: 200
    }
  ];

  const [filter, setFilter] = useState("ALL");

  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = events.filter((event) => {
    return (filter === "ALL" || event.method === filter)
    && event.endpoint.toLowerCase().includes(searchQuery.toLowerCase());
  })

  return (
    <div className = "flex min-h-screen">
      <aside className = "w-50 bg-zinc-900 text-white p-6">
        <h2>HookScope</h2>
          <ul className = "space-y-4">
            <li className = "hover:bg-zinc-800 rounded-md p-2">
              Dashboard
              </li>
            <li className = "hover:bg-zinc-800 rounded-md p-2">
              Events
              </li>
            <li className = "hover:bg-zinc-800 rounded-md p-2">
              Projects
              </li>
          </ul>
      </aside>
      <main className = "flex-auto bg-zinc-700 p-6">
        <h1 className = "font-bold text-2xl">Overview</h1>
          <div className = "grid grid-cols-3 gap-4">
            <div className="bg-zinc-800 p-4 rounded-lg text-white">
              <h3 className="text-sm text-zinc-400">Received Events</h3>
              <p className="text-3xl font-bold">128</p>
            </div>
            <div className="bg-zinc-800 p-4 rounded-lg text-white">
              <h3 className="text-sm text-zinc-400">Success Rate</h3>
              <p className="text-3xl font-bold">97%</p>
            </div>
            <div className="bg-zinc-800 p-4 rounded-lg text-white">
              <h3 className="text-sm text-zinc-400">Errors</h3>
              <p className="text-3xl font-bold">3</p>
            </div>
          </div>
          <section className = "mt-8">
            <h2 className="text-xl font-bold">Recent Events</h2>
            <input type = "text"
            placeholder = "search events..."
            value = {searchQuery}
            onChange = {(e) => setSearchQuery(e.target.value)}
          />
            <button
              onClick = {() => setFilter("ALL")}
              className = {filter === "ALL" ? " text-white px-2 py-2 rounded-md" : " text-zinc-400 px-2 py-2 rounded-md"}
            >
              ALL
            </button>
            <button
              onClick = {() => setFilter("GET")}
              className = {filter === "GET" ? "text-white px-2 py-2 rounded-md" : "text-zinc-400 px-2 py-2 rounded-md"}
            >
              GET
            </button>
            <button
              onClick = {() => setFilter("POST")}
              className = {filter === "POST" ? " text-white px-2 py-2 rounded-md" : " text-zinc-400 px-2 py-2 rounded-md"}
            >
              POST
            </button>
            <div className="space-y-3">
              {filteredEvents.map((event) => {
                const isSuccess = event.status >= 200 && event.status < 300;
                const isGet = event.method === "GET";
                const isPost = event.method === "POST";
                return (
                  <div key = {event.id} className = "flex justify-between items-center bg-zinc-800 p-4 rounded-lg text-white">
                    <span className = {isGet ? "text-blue-400" : isPost ? "text-green-400" : "text-white"}>{event.method}</span>
                    <span>{event.endpoint}</span>
                    <span className = {isSuccess ? "text-green-400" : "text-red-400"}>{isSuccess ? "SUCCESS" : "ERROR"}({event.status})</span>
                  </div>
                );
              })}
            </div>
          </section>
      </main>
    </div>
  )
}
