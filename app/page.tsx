"use client";

import { Header } from "@/components/header/header";
import { SearchBar } from "@/components/search/search";
import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-surface-dark text-white flex flex-col">
      <Header />
      <main>
        <div className="flex flex-col items-center relative">
          <SearchBar />
        </div>
      </main>
    </div>
  );
}

export default App;
