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
    <dl
      className="flex items-center space-x-4 text-sm text-[var(--color-primary-400)]"
      aria-label="Repository statistics"
    >
      <div className="group flex items-center transition-transform duration-300 hover:scale-110 hover:text-[var(--color-accent-500)]">
        <dt className="sr-only">Stars</dt>
        <Star
          size={16}
          className="mr-1 group-hover:fill-[var(--color-accent-500)] group-hover:text-[var(--color-accent-500)]"
        />
        <dd>{formatNumber(stars)}</dd>
      </div>

      <div className="group flex items-center transition-transform duration-300 hover:scale-110 hover:text-[var(--color-primary-500)]">
        <dt className="sr-only">Forks</dt>
        <GitFork
          size={16}
          className="mr-1 group-hover:text-[var(--color-primary-500)]"
        />
        <dd>{formatNumber(forks)}</dd>
      </div>

      <div className="group flex items-center transition-transform duration-300 hover:scale-110 hover:text-[var(--color-accent-700)]">
        <dt className="sr-only">Open issues</dt>
        <AlertCircle
          size={16}
          className="mr-1 group-hover:text-[var(--color-accent-700)]"
        />
        <dd>{formatNumber(issues)}</dd>
      </div>
    </dl>
  );
};
