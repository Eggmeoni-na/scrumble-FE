export class StatusError extends Error {
  response: {
    status: number;
  };

  constructor(status: number, message?: string) {
    super(message);
    this.response = {
      status,
    };
    this.name = 'StatusError';
  }
}
