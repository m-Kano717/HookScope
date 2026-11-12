"use client";

import { useState, useEffect } from "react";

  type WebhookEvent = {
    id: number;
    projectId: number;
    method: string;
    endpoint: string;
    receivedAt: string;
  };

export default function Home() {

  const [apiEvents, setApiEvents] = useState<WebhookEvent[]>([]);

  useEffect(() => {
    async function loadEvents(){
      const response = await fetch("/api/events");
      const data = await response.json();
      setApiEvents(data);
    }
    loadEvents();
  }, []);

  const [filter, setFilter] = useState("ALL");

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedEvent, setSelectedEvent] = useState<WebhookEvent | null>(null);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredEvents = apiEvents.filter((event) => {
    return (filter === "ALL" || event.method === filter)
    && (event.endpoint.toLowerCase().includes(normalizedQuery)
    || event.method.toLowerCase().includes(normalizedQuery));
  });
 

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
          <div className = "grid grid-cols-1 gap-4">
            <div className="bg-zinc-800 p-4 rounded-lg text-white">
              <h3 className="text-sm text-zinc-400">Received Events</h3>
              <p className="text-3xl font-bold">{apiEvents.length}</p>
            </div>
          </div>
          <section className = "mt-8">
            {/* 詳細パネル */}
            {selectedEvent && (
              <div className = "relative flex flex-col rounded-md text-white text-lg p-4 gap-2 bg-zinc-800">
                <button onClick = {() => setSelectedEvent(null)}
                 className = "absolute right-1 top-1 pr-2 pl-2 rounded-full bg-zinc-700 text-zinc-400 hover:bg-zinc-600 transition-colors duration-75">
                  ×
                </button>
                <p>Method: {selectedEvent.method}</p>
                <p>Endpoint: {selectedEvent.endpoint}</p>
                <p className =  "text-emerald-400">Received</p>
                <p>Received At: {selectedEvent.receivedAt}</p>
              </div>
            )}
            <h2 className="text-xl font-bold">
              Recent Events
            </h2>
            {/* 検索 */}
            <div>
              <input type = "text"
                placeholder = "search events..."
                value = {searchQuery}
                onChange = {(e) => setSearchQuery(e.target.value)}
                className="w-1/2 bg-zinc-800 text-white border border-zinc-700 px-4 py-2 rounded-md"
              />
            </div>
            {/* 絞り込み */}
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
              <h3 className = "grid grid-cols-[100px_1.3fr_1.7fr_170px] items-center bg-zinc-800 p-4 rounded-lg text-white">
                <span>Method</span>
                <span>Endpoint</span>
                <span>Received At</span>
                <span>Status</span>
              </h3>
              {filteredEvents.length === 0 ? 
                <div className="text-zinc-400 text-center p-8">
                  No Events Found
                </div>
               : filteredEvents.map((event) => {
                const isGet = event.method === "GET";
                const isPost = event.method === "POST";
                return (
                  <div key = {event.id} onClick = {() => setSelectedEvent(event)} className = "hover:bg-zinc-900 transition-colors duration-200 grid grid-cols-[100px_1.3fr_1.7fr_170px] items-center bg-zinc-800 p-4 rounded-lg text-white">
                    <span className = {isGet ? "text-blue-400" : isPost ? "text-green-400" : "text-white"}>{event.method}</span>
                    <span>{event.endpoint}</span>
                    <span className = "text-sm text-zinc-400">{event.receivedAt}</span>
                    <span className = "text-emerald-400">Received</span>
                  </div>
                );
              })}
            </div>
          </section>
      </main>
    </div>
  )
}
