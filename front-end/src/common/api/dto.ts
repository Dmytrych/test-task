export type ApiError = {
  message?: string,
  details?: unknown
}

export type ApiResponse<TData> = {
  success: boolean,
  error?: ApiError,
  data?: TData
}
