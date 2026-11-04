import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data, error } = await getSupabaseAdmin()
      .from("site_content")
      .select("section")
      .limit(1);

    if (error) throw error;

    return NextResponse.json({
      ok: true,
      timestamp: new Date().toISOString(),
      rows: data?.length ?? 0,
    });
  } catch (error) {
    console.error("Keep-alive ping failed:", error);
    return NextResponse.json({ ok: false, error: "Database ping failed" }, { status: 500 });
  }
}
