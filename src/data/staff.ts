export type Staff = {
  id: string;
  name: string;
  role: string;
  title: string;
  email: string;
  password: string;
  permissions: string[];
};

export const staff: Staff[] = [
  {
    id: "s1",
    name: "Mekdes Alemu",
    role: "rights_manager",
    title: "Head of Rights & Permissions",
    email: "mekdes.alemu@literary.com",
    password: "Rights#2026",
    permissions: ["Approve author book requests", "Approve agent collaborations", "Release contacts"],
  },
  {
    id: "s2",
    name: "Daniel Tesfaye",
    role: "acquisitions_editor",
    title: "Acquisitions Editor",
    email: "daniel.tesfaye@literary.com",
    password: "Acquire#2026",
    permissions: ["Review new manuscripts", "Recommend titles to rights"],
  },
  {
    id: "s3",
    name: "Hanna Bekele",
    role: "catalogue_editor",
    title: "Catalogue & Metadata Editor",
    email: "hanna.bekele@literary.com",
    password: "Catalog#2026",
    permissions: ["Edit bibliographic records", "Publish author pages"],
  },
  {
    id: "s4",
    name: "Yonas Girma",
    role: "archivist",
    title: "Archivist, Horn of Africa Collections",
    email: "yonas.girma@literary.com",
    password: "Archive#2026",
    permissions: ["Manage archival scans", "Verify provenance"],
  },
  {
    id: "s5",
    name: "Sara Wolde",
    role: "agent_liaison",
    title: "Publishing Agent Liaison",
    email: "sara.wolde@literary.com",
    password: "Liaison#2026",
    permissions: ["Answer agent enquiries", "Triage collaboration requests"],
  },
  {
    id: "s6",
    name: "Abel Tadesse",
    role: "production",
    title: "Production & Design Lead",
    email: "abel.tadesse@literary.com",
    password: "Produce#2026",
    permissions: ["Upload covers", "Approve print files"],
  },
];

/** Deterministic colour between rgb(164,0,29) and rgb(255,152,29). */
export function bookColor(seed: string) {
  let n = 0;
  for (const ch of seed) n = (n * 31 + ch.charCodeAt(0)) % 1009;
  const t = (n % 100) / 99;
  const r = Math.round(164 + (255 - 164) * t);
  const g = Math.round(0 + 152 * t);
  return `rgb(${r} ${g} 29)`;
}
