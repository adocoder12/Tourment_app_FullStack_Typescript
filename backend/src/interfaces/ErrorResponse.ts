import MessageResponse from "./MessageResponse";

export default interface ErrorResponse {
  error: {
    message: string;
    stack?: string;
  };
}
