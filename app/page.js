"use client";

import UsersTable from "./components/usersTable";
import Header from "./components/header";
import MultiplayerTextEditor from "./components/multiplayerTextEditor";

export default function Home() {
  return (
    <>
      <div className="min-h-full">
        <div className="bg-indigo-600 pb-32">
          <Header />
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Event Manager
              </h1>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
              <MultiplayerTextEditor />
              <UsersTable />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
