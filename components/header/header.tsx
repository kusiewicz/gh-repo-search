import React from "react";
import { Github } from "lucide-react";

export const Header = () => {
  return (
    <header className="relative py-12 sm:py-24" role="banner">
      <div className="container mx-auto">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="shadow-primary-500/10 hover:shadow-glow-primary group flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 shadow-lg backdrop-blur-sm transition-all duration-500 hover:scale-105">
              <Github
                className="group-hover:text-primary-400 h-10 w-10 text-white transition-colors duration-300"
                data-testid="github-icon"
              />
            </div>

            <h1 className="to-primary-200 animate-fade-in bg-gradient-to-br from-white via-white/90 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl">
              GitHub Repo Search
            </h1>

            <p className="max-w-2xl text-lg text-white/70 sm:text-xl">
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
