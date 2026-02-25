import Airtable from "airtable";

if (!process.env.AIRTABLE_PAT || !process.env.AIRTABLE_BASE_ID) {
  console.warn(
    "[airtable] AIRTABLE_PAT or AIRTABLE_BASE_ID not set — falling back to static data"
  );
}

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_PAT ?? "" });
const base = airtable.base(process.env.AIRTABLE_BASE_ID ?? "");

export default base;

/** True when env vars are configured */
export const isAirtableConfigured =
  !!process.env.AIRTABLE_PAT &&
  process.env.AIRTABLE_PAT !== "pat_REPLACE_ME" &&
  !!process.env.AIRTABLE_BASE_ID &&
  process.env.AIRTABLE_BASE_ID !== "app_REPLACE_ME";
