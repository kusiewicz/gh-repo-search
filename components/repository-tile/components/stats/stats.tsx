import React from "react";
import { Star, GitFork, AlertCircle } from "lucide-react";

interface StatsProps {
  stars: number;
  forks: number;
  issues: number;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

export const Stats = ({ stars, forks, issues }: StatsProps) => {
  return (
    <div className="flex items-center space-x-4 text-sm text-[var(--color-primary-400)]">
      <div className="flex items-center transition-transform duration-300 hover:scale-110 hover:text-[var(--color-accent-500)] group">
        <Star
          size={16}
          className="mr-1 group-hover:fill-[var(--color-accent-500)] group-hover:text-[var(--color-accent-500)]"
        />
        <span>{formatNumber(stars)}</span>
      </div>

      <div className="flex items-center transition-transform duration-300 hover:scale-110 hover:text-[var(--color-primary-500)] group">
        <GitFork
          size={16}
          className="mr-1 group-hover:text-[var(--color-primary-500)]"
        />
        <span>{formatNumber(forks)}</span>
      </div>

      <div className="flex items-center transition-transform duration-300 hover:scale-110 hover:text-[var(--color-accent-700)] group">
        <AlertCircle
          size={16}
          className="mr-1 group-hover:text-[var(--color-accent-700)]"
        />
        <span>{formatNumber(issues)}</span>
      </div>
    </div>
  );
};
