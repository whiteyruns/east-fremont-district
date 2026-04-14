import { getSupabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import OutreachClient from "./client";

interface PageProps {
  params: Promise<{ token: string }>;
}

async function getTarget(token: string) {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("efd_outbound_targets")
      .select("*")
      .eq("magic_link_token", token)
      .single();

    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

export default async function OutreachPage({ params }: PageProps) {
  const { token } = await params;
  const target = await getTarget(token);

  if (!target) {
    notFound();
  }

  return <OutreachClient target={target} token={token} />;
}
