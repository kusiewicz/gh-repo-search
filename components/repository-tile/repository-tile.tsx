import React from "react";
import { ExternalLink } from "lucide-react";
import { formatDate, formatTimeAgo } from "../../utils/date-formatter";
import Image from "next/image";
import { TopicTags } from "./components/topic-tags/topic-tags";
import { Stats } from "./components/stats/stats";
import { RepositoryProps } from "@/api/queries/get-repositories-query/types";
import { LanguageIndicator } from "./components/language-indicator/language-indicator";

interface RepositoryTileProps {
  repositoryDetails: RepositoryProps;
}

const RepositoryTile = ({ repositoryDetails }: RepositoryTileProps) => {
  return (
    <div className="group bg-[var(--color-surface-card)] rounded-xl border border-[var(--color-surface-elevated)] transition-all duration-300 hover:translate-y-[-4px] hover:border-[var(--color-primary-400)]">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Image
            src={repositoryDetails.owner.avatar_url}
            alt={`${repositoryDetails.owner.login}'s avatar`}
            className="w-10 h-10 rounded-full mr-3 ring-2 ring-[var(--color-surface-elevated)]"
            width={30}
            height={30}
          />
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-[var(--color-primary-100)] group-hover:text-[var(--color-primary-400)] transition-colors duration-300">
              {repositoryDetails.full_name}
            </h2>
            <p className="text-sm text-[var(--color-primary-400)]">
              Updated {formatTimeAgo(repositoryDetails.updated_at)}
            </p>
          </div>
        </div>

        <p className="text-[var(--color-primary-300)] mb-4">
          {repositoryDetails.description || "No description provided"}
        </p>

        <TopicTags topics={repositoryDetails.topics} />

        <div className="mt-4 pt-4 border-t border-[var(--color-surface-elevated)] flex flex-wrap justify-between items-center">
          <LanguageIndicator language={repositoryDetails.language} />
          <Stats
            stars={repositoryDetails.stargazers_count}
            forks={repositoryDetails.forks_count}
            issues={repositoryDetails.open_issues_count}
          />
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-[var(--color-primary-400)]">
            Created: {formatDate(repositoryDetails.created_at)}
          </span>
          <a
            href={repositoryDetails.html_url}
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
