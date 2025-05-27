import React from "react";

export const TopicTags = ({ topics }: { topics: string[] }) => {
  if (!topics || topics.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {topics.slice(0, 5).map((topic) => (
        <span
          key={topic}
          className="px-2 py-1 text-xs font-medium text-[var(--color-primary-200)] bg-[var(--color-primary-900)]/50 rounded-full 
                   transition-all duration-300 hover:bg-[var(--color-primary-800)] hover:scale-105"
        >
          {topic}
        </span>
      ))}
      {topics.length > 5 && (
        <span className="px-2 py-1 text-xs font-medium text-[var(--color-primary-300)] bg-[var(--color-surface-elevated)] rounded-full">
          +{topics.length - 5} more
        </span>
      )}
    </div>
  );
};
