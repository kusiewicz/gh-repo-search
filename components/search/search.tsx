"use client";

import { useRef, useEffect, ChangeEvent } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div
      className="relative w-full max-w-[550px] animate-slide-up group"
      aria-label="GitHub repository search"
    >
      <span className="absolute left-0 pl-4 flex items-center h-full pointer-events-none">
        <Search
          size={20}
          className="text-white/70 group-focus-within:text-primary-400 transition-colors duration-300"
        />
      </span>

      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={handleChange}
        placeholder="Search GitHub repositories..."
        className="w-full pl-12 pr-12 py-4 text-lg bg-surface-card/80 border border-white/10 rounded-xl 
                  text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary-500/50 
                  focus:border-primary-500/50 focus:bg-surface-elevated/90 shadow-lg shadow-black/20 
                  hover:shadow-glow-primary/10 focus:shadow-glow-primary transition-all duration-300"
        aria-label="Search GitHub repositories"
        role="search"
      />

      {value && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/60 hover:text-white 
                    transition-colors duration-200 group cursor-pointer"
          aria-label="Clear search"
          type="button"
        >
          <X
            size={20}
            className="relative z-10 group-hover:text-accent-400 transition-colors duration-200"
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  );
};
