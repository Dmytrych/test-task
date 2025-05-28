import {LoginResponse} from "@/common/api/auth/dto";
import {ApiResponse} from "@/common/api/dto";
import {backendClientApiAdapter, backendServerApiAdapter} from "@/common/api/adapter-instances";

export const authorize = async (email: string, password: string): Promise<ApiResponse<LoginResponse>> => {
  return backendServerApiAdapter.post<ApiResponse<LoginResponse>>("/v1/auth/login", { email, password })
}

export const register = async (name: string, email: string, password: string): Promise<ApiResponse<LoginResponse>> => {
  return backendClientApiAdapter.post<ApiResponse<LoginResponse>>("/v1/auth/register", { name, email, password })
}
