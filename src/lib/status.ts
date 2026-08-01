export function statusLabel(status: string) {
  switch (status) {
    case "pending":
      return "Pending";
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
    case "contact_agents":
      return "Contact literary agents";
    default:
      return status;
  }
}

export function statusTone(status: string) {
  switch (status) {
    case "approved":
      return "bg-emerald-700 text-white hover:bg-emerald-700";
    case "rejected":
      return "bg-neutral-800 text-white hover:bg-neutral-800";
    case "contact_agents":
      return "bg-primary text-primary-foreground hover:bg-primary";
    default:
      return "bg-neutral-200 text-foreground hover:bg-neutral-200";
  }
}
