"use client";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es as dateFnsEs } from "date-fns/locale";
import React from "react";
import { SWRConfig } from "swr";
import { useAuthApi } from "../(api)/api";
import { AxiosRequestConfig } from "axios";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const getApi = useAuthApi();

  const fetcher = async (key: string | [string, AxiosRequestConfig]) => {
    const [url, config] = typeof key === "string" ? [key] : key;

    try {
      const api = await getApi();
      // console.log("📡 API instance created:", api)
      // console.log("🔗 API baseURL:", api.defaults.baseURL)
      
      const res = await api.get(url, config);
      // console.log("✅ Response received:", res.data)
      return res.data;
    } catch (error) {
      // console.error("❌ Error in fetcher:", error)
      throw error;
    }
  };

  return (
    <SWRConfig value={{ fetcher }}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={dateFnsEs}
      >
        {children}
      </LocalizationProvider>
    </SWRConfig>
  );
};
