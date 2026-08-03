import s11 from "@/assets/staff-11.png.asset.json";
import s12 from "@/assets/staff-12.png.asset.json";
import s13 from "@/assets/staff-13.png.asset.json";
import s14 from "@/assets/staff-14.png.asset.json";
import s15 from "@/assets/staff-15.png.asset.json";
import s16 from "@/assets/staff-16.png.asset.json";

export type Staff = {
  id: string;
  name: string;
  role: string;
  title: string;
  email: string;
  password: string;
  permissions: string[];
  photo: string;
  linkedin: string;
  contactEmail: string;
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
    photo: s11.url,
    linkedin: "https://linkedin.com/in/mekdes-alemu-placeholder",
    contactEmail: "m.alemu@example-tsehai.com",
  },
  {
    id: "s2",
    name: "Daniel Tesfaye",
    role: "acquisitions_editor",
    title: "Acquisitions Editor",
    email: "daniel.tesfaye@literary.com",
    password: "Acquire#2026",
    permissions: ["Review new manuscripts", "Recommend titles to rights"],
    photo: s12.url,
    linkedin: "https://linkedin.com/in/daniel-tesfaye-placeholder",
    contactEmail: "d.tesfaye@example-tsehai.com",
  },
  {
    id: "s3",
    name: "Hanna Bekele",
    role: "catalogue_editor",
    title: "Catalogue & Metadata Editor",
    email: "hanna.bekele@literary.com",
    password: "Catalog#2026",
    permissions: ["Edit bibliographic records", "Publish author pages"],
    photo: s13.url,
    linkedin: "https://linkedin.com/in/hanna-bekele-placeholder",
    contactEmail: "h.bekele@example-tsehai.com",
  },
  {
    id: "s4",
    name: "Yonas Girma",
    role: "archivist",
    title: "Archivist, Horn of Africa Collections",
    email: "yonas.girma@literary.com",
    password: "Archive#2026",
    permissions: ["Manage archival scans", "Verify provenance"],
    photo: s14.url,
    linkedin: "https://linkedin.com/in/yonas-girma-placeholder",
    contactEmail: "y.girma@example-tsehai.com",
  },
  {
    id: "s5",
    name: "Sara Wolde",
    role: "agent_liaison",
    title: "Publishing Agent Liaison",
    email: "sara.wolde@literary.com",
    password: "Liaison#2026",
    permissions: ["Answer agent enquiries", "Triage collaboration requests"],
    photo: s15.url,
    linkedin: "https://linkedin.com/in/sara-wolde-placeholder",
    contactEmail: "s.wolde@example-tsehai.com",
  },
  {
    id: "s6",
    name: "Abel Tadesse",
    role: "production",
    title: "Production & Design Lead",
    email: "abel.tadesse@literary.com",
    password: "Produce#2026",
    permissions: ["Upload covers", "Approve print files"],
    photo: s16.url,
    linkedin: "https://linkedin.com/in/abel-tadesse-placeholder",
    contactEmail: "a.tadesse@example-tsehai.com",
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
