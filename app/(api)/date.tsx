import { isValid, parse, parseISO, subYears } from "date-fns";
import { format } from "date-fns/fp";

export const formatDateTime = format("dd/MM/yyyy HH:mm");

export const minYear = subYears(new Date(), 103);

export const today = new Date();

export const parseDate = (date: string) =>
  parse(date, "yyyy-MM-dd", new Date());

const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?$/;

// see: https://stackoverflow.com/questions/28020805/regex-validate-correct-iso8601-date-string-with-time
const isoZonedDateFormat = /^(?:[1-9]\d{3}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[1-9]\d(?:0[48]|[2468][048]|[13579][26])|(?:[2468][048]|[13579][26])00)-02-29)T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:Z|[+-][01]\d:[0-5]\d)$/

function isIsoDateString(value: any): boolean {
  return value && typeof value === "string" && isoDateFormat.test(value);
}

function isIsoZonedDateString(value: any): boolean {
  return value && typeof value === "string" && isoZonedDateFormat.test(value);
}

// See: https://stackoverflow.com/questions/65692061/casting-dates-properly-from-an-api-response-in-typescript
export function handleDates(body: any) {
  if (body === null || body === undefined || typeof body !== "object")
    return body;

  for (const key of Object.keys(body)) {
    const value = body[key];
    if (isIsoDateString(value)) body[key] = parseISO(value);
    else if(isIsoZonedDateString(value)) body[key] = new Date(value);
    else if (isValid(parseDate(value))) body[key] = parseDate(value);
    else if (typeof value === "object") handleDates(value);
  }
}
