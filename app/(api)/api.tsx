import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { env } from "../env";
import { handleDates } from "./date";

// srtomy-api versions its endpoints under /v1 (see srtomy-api#23); kept out of
// NEXT_PUBLIC_API_URL itself so every environment's env var only has to name
// the API's origin, not repeat the version suffix.
export const apiUrl = `${env.NEXT_PUBLIC_API_URL}/v1`;

export const useAuthApi = () => {
  const { getAccessTokenSilently } = useAuth0();

  return async () => {
    const accessToken = await getAccessTokenSilently();

    const api = axios.create({
      baseURL: apiUrl,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    api.interceptors.response.use((originalResponse) => {
      handleDates(originalResponse.data);
      return originalResponse;
    });

    return api;
  };
};
