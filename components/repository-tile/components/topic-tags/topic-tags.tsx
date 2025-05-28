import React from "react";

export const TopicTags = ({ topics }: { topics: string[] }) => {
  if (!topics || topics.length === 0) return null;

  return (
    <ul className="mb-4 flex flex-wrap justify-center gap-2 sm:justify-start">
      {topics.slice(0, 5).map((topic) => (
        <li
          key={topic}
          id={topic}
          className="rounded-full bg-[var(--color-primary-900)]/50 px-2 py-1 text-xs font-medium text-[var(--color-primary-200)] transition-all duration-300 hover:scale-105 hover:bg-[var(--color-primary-800)]"
        >
          {topic}
        </li>
      ))}
      {topics.length > 5 && (
        <li
          className="rounded-full bg-[var(--color-surface-elevated)] px-2 py-1 text-xs font-medium text-[var(--color-primary-300)]"
          aria-label={`and ${topics.length - 5} more topics`}
        >
          +{topics.length - 5} more
        </li>
      )}
    </ul>
  );
};
