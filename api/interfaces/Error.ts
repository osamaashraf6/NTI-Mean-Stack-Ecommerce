export interface IError extends Error {
  status?: string;
  statusCode?: number;
}
