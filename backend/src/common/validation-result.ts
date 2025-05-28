import {ApiResponse} from "./response-helpers";

export type ValidationResult<TData> = SuccessResult<TData> | FailureResult

type SuccessResult<TData = undefined> = {
  success: true
  data?: TData
}

type FailureResult = {
  success: false,
  error?: {
    message?: string,
    details?: any
  }
}

export const toApiResponse = <TData>(result: ValidationResult<TData>): ApiResponse<TData> => {
  if (!result.success) {
    return {
      success: result.success,
      error: {
        ...result.error
      }
    }
  }

  return {
    success: result.success,
    data: result?.data
  }
}
