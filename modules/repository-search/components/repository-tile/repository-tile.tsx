import Image from "next/image";
import { TopicTags } from "./components/topic-tags/topic-tags";
import { Stats } from "./components/stats/stats";
import { RepositoryProps } from "@/modules/repository-search/api/types";
import { LanguageIndicator } from "./components/language-indicator/language-indicator";
import {
  formatDate,
  formatTimeAgo,
} from "@/utils/date-formatter/date-formatter";

interface RepositoryTileProps {
  repositoryDetails: RepositoryProps;
}

export const RepositoryTile = ({ repositoryDetails }: RepositoryTileProps) => {
  return (
    <a
      href={repositoryDetails.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group hover:shadow-glow-accent z-10 block rounded-xl border border-[var(--color-surface-elevated)] bg-[var(--color-surface-card)]/30 p-4 shadow-md transition-all duration-300 hover:translate-y-[-4px] hover:border-[var(--color-primary-400)] sm:p-4"
      aria-label={`Repository ${repositoryDetails.full_name} by ${repositoryDetails.owner.login} - opens in new tab`}
      title={`Open ${repositoryDetails.full_name} repository`}
    >
      <article
        className="flex h-full flex-col p-3 sm:p-4"
        id={`repo-${repositoryDetails.id}`}
      >
        <div className="mb-4 flex flex-shrink-0 flex-col items-center sm:flex-row sm:items-start">
          <Image
            src={repositoryDetails.owner.avatar_url}
            alt={`Avatar of GitHub user ${repositoryDetails.owner.login}`}
            className="mr-3 mb-2 h-10 w-10 rounded-full ring-2 ring-[var(--color-surface-elevated)] sm:h-12 sm:w-12"
            width={30}
            height={30}
          />
          <div className="min-w-0 flex-1 sm:-mt-1">
            <h2 className="mb-1 overflow-hidden text-center text-lg font-semibold text-ellipsis whitespace-nowrap text-[var(--color-primary-100)] transition-colors duration-300 group-hover:text-[var(--color-primary-400)] sm:text-left">
              {repositoryDetails.full_name}
            </h2>
            <p className="text-center text-sm text-[var(--color-primary-400)] sm:text-left">
              Updated {formatTimeAgo(repositoryDetails.updated_at)}
            </p>
          </div>
        </div>

        <p className="mb-4 line-clamp-10 flex-grow text-center text-[var(--color-primary-300)] sm:text-left">
          {repositoryDetails.description || "No description provided"}
        </p>

        {repositoryDetails.topics.length ? (
          <TopicTags topics={repositoryDetails.topics} />
        ) : null}

        <footer className="mt-4 flex flex-col gap-4 border-t border-[var(--color-surface-elevated)] pt-4 sm:gap-2">
          <div className="flex flex-col items-center justify-between gap-y-2 sm:flex-row sm:gap-x-4">
            {repositoryDetails.language ? (
              <LanguageIndicator language={repositoryDetails.language} />
            ) : null}
            <Stats
              stars={repositoryDetails.stargazers_count}
              forks={repositoryDetails.forks_count}
              issues={repositoryDetails.open_issues_count}
            />
          </div>

          <div className="flex flex-shrink-0 flex-col items-center justify-between sm:flex-row">
            <span className="text-xs text-[var(--color-primary-400)]">
              Created: {formatDate(repositoryDetails.created_at)}
            </span>
          </div>
        </footer>
      </article>
    </a>
  );
};
