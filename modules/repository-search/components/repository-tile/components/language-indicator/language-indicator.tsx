import { getLanguageColor } from "@/utils/language-colors/language-colors";

export const LanguageIndicator = ({
  language,
  className,
}: {
  language: string;
  className?: string;
}) => {
  const languageColor = getLanguageColor(language);

  return (
    <div
      className={`flex items-center ${className}`}
      aria-label={`Repository language: ${language}`}
    >
      <span
        className="mr-1.5 inline-block h-3 w-3 rounded-full"
        style={{ backgroundColor: languageColor }}
        aria-hidden="true"
      />
      <span className="text-sm text-[var(--color-primary-300)]">
        {language}
      </span>
    </div>
  );
};
