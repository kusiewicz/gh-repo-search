"use client";

import { useRef, useEffect, ChangeEvent } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const SearchBar = ({ value, onChange, placeholder }: SearchBarProps) => {
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
      className="group relative w-full max-w-[550px]"
      aria-label="GitHub repository search"
    >
      <span className="pointer-events-none absolute left-0 flex h-full items-center pl-4">
        <Search
          size={20}
          className="group-focus-within:text-primary-400 text-white/70 transition-colors duration-300"
        />
      </span>

      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="bg-surface-card/80 focus:ring-primary-500/50 focus:border-primary-500/50 focus:bg-surface-elevated/90 hover:shadow-glow-primary/10 focus:shadow-glow-primary w-full rounded-xl border border-white/10 py-4 pr-12 pl-12 text-base text-white placeholder-white/40 shadow-lg shadow-black/20 transition-all duration-300 focus:ring-2 focus:outline-none sm:text-lg"
        aria-label="Search GitHub repositories"
        role="search"
      />

      {value && (
        <button
          onClick={handleClear}
          className="group absolute inset-y-0 right-0 flex cursor-pointer items-center pr-4 text-white/60 transition-colors duration-200 hover:text-white"
          aria-label="Clear search"
          type="button"
        >
          <X
            size={20}
            className="group-hover:text-accent-400 relative z-10 transition-colors duration-200"
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  );
};
