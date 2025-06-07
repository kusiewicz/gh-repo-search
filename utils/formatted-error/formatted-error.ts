export class FormattedError extends Error {
  public readonly userMessage: string;

  constructor(userMessage: string, technicalMessage: string) {
    super(technicalMessage);
    this.name = "FormattedError";
    this.userMessage = userMessage;
  }
}
