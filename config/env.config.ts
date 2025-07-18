export const envConfig = {
  vapi: {
    apiUrl: process.env.NEXT_PUBLIC_VAPI_API_URL ?? "https://api.vapi.ai",
    token: process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN ?? "vapi-web-token",
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY ?? "your-openai-api-key",
  },
};
