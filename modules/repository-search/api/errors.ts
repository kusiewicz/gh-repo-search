import { FormattedError } from "@/utils/formatted-error/formatted-error";
import { formatHoursMinutes } from "@/utils/date-formatter/date-formatter";

const getResetDate = (headers: Headers) => {
  const resetTimestamp = parseInt(headers.get("x-ratelimit-reset") || "0", 10);

  return formatHoursMinutes(new Date(resetTimestamp * 1000));
};

// https://docs.github.com/en/rest/using-the-rest-api/troubleshooting-the-rest-api?apiVersion=2022-11-28
export const createFormattedError = (
  error: Error,
  response: Response,
): FormattedError => {
  const technicalMessage = error.message;

  switch (response.status) {
    case 403:
    case 429:
      return new FormattedError(
        `You've exceeded GitHub's API rate limit. Please wait until ${getResetDate(response.headers)} before trying again, or sign in with a GitHub token to increase your rate limit.`,
        technicalMessage,
      );

    case 500:
    case 502:
    case 503:
    case 504:
      return new FormattedError(
        "GitHub's servers are temporarily unavailable. Please try again in a few minutes.",
        technicalMessage,
      );

    default:
      return new FormattedError(
        "An unexpected error occurred while searching repositories. Please try again.",
        technicalMessage,
      );
  }
};
