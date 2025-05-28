export type ApiError = {
  message?: string,
  details?: any
}

export type ApiResponse<TData> = {
  success: boolean,
  error?: ApiError,
  data?: TData
}

export const getSuccessResponse = <TData>(data?: TData): ApiResponse<TData> => {
  return {
    success: true,
    data
  }
}

export const getErrorResponse = <TData>(error?: ApiError, data?: TData): ApiResponse<TData> => {
  return {
    success: false,
    error
  }
}
