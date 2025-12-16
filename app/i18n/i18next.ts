import i18next from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { languages, fallbackLng, defaultNS } from "./settings";
import translation from "zod-i18n-map/locales/es/zod.json";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";

const runsOnServerSide = typeof window === "undefined";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`),
    ),
  )
  .init({
    lng: "es",
    supportedLngs: languages,
    fallbackLng,
    fallbackNS: defaultNS,
    defaultNS,
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
    preload: runsOnServerSide ? languages : [],
    resources: {
      es: { zod: translation },
    },
  });

z.config({
  customError: zodI18nMap,
});

export { z };
