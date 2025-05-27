"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import { Search, X } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface SearchBarProps {
  onSearchChange: (query: string) => void;
}

export const SearchBar = ({ onSearchChange }: SearchBarProps) => {
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get("q") || "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onSearchChange(inputValue);
  }, [inputValue, onSearchChange]);

  const handleClear = () => {
    setInputValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="relative w-full max-w-[550px] animate-slide-up group">
      <span className="absolute left-0 pl-4 flex items-center h-full">
        <Search
          size={20}
          className="text-white/70 group-focus-within:text-primary-400 transition-colors duration-300"
        />
      </span>

      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search GitHub repositories..."
        className="w-full pl-12 pr-12 py-4 text-lg bg-surface-card/80 border border-white/10 rounded-xl 
                  text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary-500/50 
                  focus:border-primary-500/50 focus:bg-surface-elevated/90 shadow-lg shadow-black/20 
                  hover:shadow-glow-primary/10 focus:shadow-glow-primary transition-all duration-300"
        aria-label="Search GitHub repositories"
      />

      {inputValue && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/60 hover:text-white 
                    transition-colors duration-200 group cursor-pointer"
          aria-label="Clear search"
        >
          <X
            size={20}
            className="relative z-10 group-hover:text-accent-400 transition-colors duration-200"
          />
        </button>
      )}
    </div>
  );
};
