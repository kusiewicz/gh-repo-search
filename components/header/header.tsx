import React from "react";
import { Github } from "lucide-react";

export const Header = () => {
  return (
    <header className="py-24 relative" role="banner">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/30 via-primary-900/10 to-transparent" />

      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl border border-white/10 backdrop-blur-sm shadow-lg shadow-primary-500/10 hover:shadow-glow-primary transition-all duration-500 hover:scale-105 group">
              <Github
                className="w-10 h-10 text-white group-hover:text-primary-400 transition-colors duration-300"
                data-testid="github-icon"
              />
            </div>

            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight bg-gradient-to-br from-white via-white/90 to-primary-200 text-transparent bg-clip-text animate-fade-in">
              GitHub Repo Search
            </h1>

            <p className="text-lg sm:text-xl text-white/70 max-w-2xl">
              Discover and explore GitHub repositories with our powerful search
              tool. Find exactly what you&apos;re looking for with real-time
              results and infinite scrolling.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
