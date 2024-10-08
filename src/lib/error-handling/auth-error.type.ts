export enum AuthErrors {
  INSUFFICIENT_CREDENTIALS = "Username or password is incorrect",
  USER_ALREADY_EXISTS = "User already exists with that username or email",
  USER_NOT_FOUND = "User not found",
  INVALID_REFRESH_TOKEN = "Invalid refresh token",
}
