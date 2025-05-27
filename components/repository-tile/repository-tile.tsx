import React from "react";
import { ExternalLink } from "lucide-react";
import { formatDate, formatTimeAgo } from "../../utils/date-formatter";
import Image from "next/image";
import { TopicTags } from "./components/topic-tags";
import { LanguageIndicator } from "./components/language-indicator";
import { Stats } from "./components/stats";
import { RepositoryTileProps } from "./types";

const RepositoryTile = ({ repoDetails }: RepositoryTileProps) => {
  return (
    <div className="group bg-[var(--color-surface-card)] rounded-xl border border-[var(--color-surface-elevated)] transition-all duration-300 hover:translate-y-[-4px] hover:border-[var(--color-primary-400)]">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Image
            src={repoDetails.owner.avatar_url}
            alt={`${repoDetails.owner.login}'s avatar`}
            className="w-10 h-10 rounded-full mr-3 ring-2 ring-[var(--color-surface-elevated)]"
            width={30}
            height={30}
          />
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-[var(--color-primary-100)] group-hover:text-[var(--color-primary-400)] transition-colors duration-300">
              {repoDetails.full_name}
            </h2>
            <p className="text-sm text-[var(--color-primary-400)]">
              Updated {formatTimeAgo(repoDetails.updated_at)}
            </p>
          </div>
        </div>

        <p className="text-[var(--color-primary-300)] mb-4">
          {repoDetails.description || "No description provided"}
        </p>

        <TopicTags topics={repoDetails.topics} />

        <div className="mt-4 pt-4 border-t border-[var(--color-surface-elevated)] flex flex-wrap justify-between items-center">
          <LanguageIndicator language={repoDetails.language} />
          <Stats
            stars={repoDetails.stargazers_count}
            forks={repoDetails.forks_count}
            issues={repoDetails.open_issues_count}
          />
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-[var(--color-primary-400)]">
            Created: {formatDate(repoDetails.created_at)}
          </span>
          <a
            href={repoDetails.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-[var(--color-primary-400)] hover:text-[var(--color-primary-300)] transition-colors duration-200"
          >
            View on GitHub
            <ExternalLink size={14} className="ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default RepositoryTile;
