import ApiAdapter from "@/common/api/api-adapter";

export const backendServerApiAdapter = new ApiAdapter(process.env.NEXT_BACKEND_BASE_URL ?? "");
export const backendClientApiAdapter = new ApiAdapter(process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? "");
