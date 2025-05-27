import React from "react";
import { getLanguageColor } from "../../../utils/language-colors";

export const LanguageIndicator = ({
  language,
}: {
  language: string | null;
}) => {
  if (!language) return null;

  const languageColor = getLanguageColor(language);

  return (
    <div className="flex items-center">
      <span
        className="inline-block w-3 h-3 rounded-full mr-1.5"
        style={{ backgroundColor: languageColor }}
        aria-hidden="true"
      />
      <span className="text-sm text-[var(--color-primary-300)]">
        {language}
      </span>
    </div>
  );
};
