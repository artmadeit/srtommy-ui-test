import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { env } from "../env";
import { handleDates } from "./date";

export const apiUrl = env.NEXT_PUBLIC_API_URL;

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
