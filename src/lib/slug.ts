export function getSlug(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’ʽʼ`]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function authorImage(name: string) {
  return `/images/authors/${getSlug(name)}.png`;
}

export function coverImage(id: string) {
  return `/images/covers/${getSlug(id)}.png`;
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}