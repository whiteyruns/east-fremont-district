import Airtable from "airtable";

/** True when env vars are configured */
export const isAirtableConfigured =
  !!process.env.AIRTABLE_PAT &&
  process.env.AIRTABLE_PAT !== "pat_REPLACE_ME" &&
  !!process.env.AIRTABLE_BASE_ID &&
  process.env.AIRTABLE_BASE_ID !== "app_REPLACE_ME";

function getBase() {
  if (!isAirtableConfigured) return null;
  const airtable = new Airtable({ apiKey: process.env.AIRTABLE_PAT! });
  return airtable.base(process.env.AIRTABLE_BASE_ID!);
}

const base = getBase();

export default base;
