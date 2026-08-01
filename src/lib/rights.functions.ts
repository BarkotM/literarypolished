import { createServerFn } from "@tanstack/react-start";

type RightsInput = {
  email: string;
  password1: string;
  password2: string;
  orgCode: string;
};

export const verifyRightsManager = createServerFn({ method: "POST" })
  .inputValidator((input: RightsInput) => input)
  .handler(async ({ data }) => {
    const email = process.env["RIGHTS_MANAGER_EMAIL"] ?? "";
    const p1 = process.env["RIGHTS_MANAGER_PASSWORD_1"] ?? "";
    const p2 = process.env["RIGHTS_MANAGER_PASSWORD_2"] ?? "";
    const code = process.env["RIGHTS_MANAGER_ORG_CODE"] ?? "";

    const ok =
      data.email.trim().toLowerCase() === email.toLowerCase() &&
      data.password1 === p1 &&
      data.password2 === p2 &&
      data.orgCode.trim() === code;

    if (!ok) return { ok: false as const };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: list } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 });
    const existing = list?.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());

    if (!existing) {
      await supabaseAdmin.auth.admin.createUser({
        email,
        password: p1,
        email_confirm: true,
        user_metadata: { kind: "rights_manager", full_name: "Rights Manager" },
      });
    } else {
      await supabaseAdmin.auth.admin.updateUserById(existing.id, { password: p1 });
      await supabaseAdmin
        .from("user_roles")
        .upsert({ user_id: existing.id, role: "rights_manager" }, { onConflict: "user_id,role" });
    }

    return { ok: true as const, email };
  });
