export class ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;

  constructor(data?: T, message?: string) {
    this.success = true;
    this.data = data;
    this.message = message;
  }

  static success<T>(data?: T, message?: string): ApiResponse<T> {
    return new ApiResponse(data, message);
  }
}
