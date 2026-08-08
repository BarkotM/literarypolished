export type AssistantOption = {
  label: string;
  /** next node id */
  to?: string;
  /** internal route to open */
  href?: string;
  /** open in a new tab */
  newTab?: boolean;
};

export type AssistantNode = {
  /** one or more bot bubbles shown in order */
  say: string[];
  options: AssistantOption[];
};

const back = (to: string, label = "Back"): AssistantOption => ({ label, to });
const home: AssistantOption = { label: "Main menu", to: "menu" };
const done: AssistantOption = { label: "That's all, thanks", to: "closing" };

export const assistantTree: Record<string, AssistantNode> = {
  start: {
    say: ["Hi, I'm Tsehai Assist — the portal's guide.", "Need assistance?"],
    options: [
      { label: "Yes", to: "who" },
      { label: "No", to: "closing" },
    ],
  },

  who: {
    say: ["To give you the best guidance, who are you here as?"],
    options: [
      { label: "A reader / researcher", to: "menu_reader" },
      { label: "An author", to: "menu_author" },
      { label: "A literary agent", to: "menu_agent" },
      { label: "TSEHAI staff", to: "menu_staff" },
      { label: "Just browsing", to: "menu" },
    ],
  },

  menu: {
    say: ["Please select from the following options."],
    options: [
      { label: "Find an author", to: "authors" },
      { label: "Find a book", to: "books" },
      { label: "Rights & permissions", to: "rights" },
      { label: "Accounts & sign in", to: "accounts" },
      { label: "Submitting a manuscript", to: "author_submit" },
      { label: "Working with a title (agents)", to: "agent_request" },
      { label: "Submission guidelines", to: "guidelines" },
      { label: "About TSEHAI & the team", to: "about" },
      { label: "Something isn't working", to: "trouble" },
      { label: "Contact a human", to: "contact" },
    ],
  },

  /* ---------------- readers ---------------- */
  menu_reader: {
    say: ["Welcome. The portal is free to browse — no account needed for reading.", "What would you like to do?"],
    options: [
      { label: "Browse authors A–Z", to: "authors" },
      { label: "Browse the catalogue", to: "books" },
      { label: "Search by language or genre", to: "search_tips" },
      { label: "Buy or access a title", to: "buy" },
      home,
    ],
  },

  authors: {
    say: ["Every author has a full page: biography, Q&A, portrait and a complete bibliography.", "How would you like to find one?"],
    options: [
      { label: "Open the Authors A–Z index", href: "/#a-z" },
      { label: "Search authors by name", to: "authors_search" },
      { label: "How the A–Z index works", to: "authors_az" },
      { label: "What's on an author page?", to: "authors_page" },
      { label: "An author is missing", to: "authors_missing" },
      home,
    ],
  },
  authors_search: {
    say: [
      "Hover 'Authors A–Z' in the header — a dropdown opens with a search field. Type a name or a language and pick from the results.",
      "You can move your mouse freely inside the dropdown; it won't vanish.",
    ],
    options: [{ label: "Take me to the authors index", href: "/#authors" }, back("authors"), home],
  },
  authors_az: {
    say: [
      "The A–Z strip filters authors by the first letter of their surname. Click a letter to jump; click it again to clear the filter.",
      "Letters with no entries are dimmed.",
    ],
    options: [{ label: "Open the A–Z index", href: "/#a-z" }, back("authors"), home],
  },
  authors_page: {
    say: [
      "An author page carries: portrait (black & white, colour on hover), lifespan, languages, a multi-paragraph biography, a Q&A section, quick links to their titles right under the name, the full bibliography and related authors.",
    ],
    options: [{ label: "Show me an example", href: "/#authors" }, back("authors"), home],
  },
  authors_missing: {
    say: [
      "The portal only lists authors published or represented by TSEHAI. If you're that author, you can request an account and submit your title for review.",
    ],
    options: [
      { label: "Author sign-up", href: "/auth/author" },
      { label: "How submissions work", to: "author_submit" },
      home,
    ],
  },

  books: {
    say: ["The catalogue holds every title, shelved by row, with an A–Z title index."],
    options: [
      { label: "Open the full catalogue", href: "/catalogue" },
      { label: "Filter by genre", to: "books_genre" },
      { label: "What's on a book page?", to: "books_page" },
      { label: "Rights availability by language", to: "rights_langs" },
      { label: "Buy or access a title", to: "buy" },
      home,
    ],
  },
  books_genre: {
    say: [
      "On the catalogue page, use the genre chips above the shelves — history, art history, reference, translation and more — and combine them with the search field.",
    ],
    options: [{ label: "Open the catalogue", href: "/catalogue" }, back("books"), home],
  },
  books_page: {
    say: [
      "A book page shows the 3D cover, buying/access options, a press-review quote, the full metadata record (ISBN, language, pages, format, publication date), a rights-availability panel and a quick link back to the author.",
    ],
    options: [{ label: "Open the catalogue", href: "/catalogue" }, back("books"), home],
  },
  search_tips: {
    say: [
      "Three search surfaces: the Authors dropdown (name or language), the Catalogue dropdown (title or author) and the search field on the catalogue page itself, which combines with genre chips.",
    ],
    options: [
      { label: "Search authors", href: "/#authors" },
      { label: "Search the catalogue", href: "/catalogue" },
      home,
    ],
  },
  buy: {
    say: [
      "Each book page lists retailer and access links. Institutions can also request library access or course adoption through the rights desk.",
    ],
    options: [
      { label: "Open the catalogue", href: "/catalogue" },
      { label: "Institutional / course adoption", to: "contact" },
      home,
    ],
  },

  /* ---------------- rights ---------------- */
  rights: {
    say: ["Rights questions — which one?"],
    options: [
      { label: "Rights availability by language", to: "rights_langs" },
      { label: "Request translation rights", to: "agent_request" },
      { label: "Permissions & quoting", to: "rights_permissions" },
      { label: "Estate representation", to: "rights_estate" },
      { label: "Speak to the rights desk", to: "contact" },
      home,
    ],
  },
  rights_langs: {
    say: [
      "Every title records four language states: Sold (licensed, unavailable), Held (retained by TSEHAI), In negotiation (under offer) and Open (available now).",
      "Agents should target Open languages first — those move fastest.",
    ],
    options: [
      { label: "See a title's rights panel", href: "/catalogue" },
      { label: "Request a title as an agent", to: "agent_request" },
      home,
    ],
  },
  rights_permissions: {
    say: [
      "Short quotations for review or scholarship are generally permitted with citation. Anything longer — anthologies, course packs, reprints — needs written clearance from the rights desk.",
    ],
    options: [{ label: "Contact the rights desk", to: "contact" }, back("rights"), home],
  },
  rights_estate: {
    say: [
      "TSEHAI represents estates of deceased authors. Executors should open an author account, mark the submission as representing an estate and attach proof of authority.",
    ],
    options: [
      { label: "Author sign-up", href: "/auth/author" },
      { label: "Read the guidelines", href: "/guidelines" },
      home,
    ],
  },

  /* ---------------- accounts ---------------- */
  accounts: {
    say: ["There are three separate entrances. Which account do you mean?"],
    options: [
      { label: "Author account", to: "acct_author" },
      { label: "Literary agent account", to: "acct_agent" },
      { label: "Rights manager console", to: "menu_staff" },
      { label: "I can't sign in", to: "trouble_login" },
      { label: "Which one do I need?", to: "acct_which" },
      home,
    ],
  },
  acct_which: {
    say: [
      "If you write the books — author account. If you acquire, license or represent titles on behalf of a publisher or client — literary agent account. Staff use the rights console, which is invitation-only.",
    ],
    options: [
      { label: "Author sign-up", href: "/auth/author" },
      { label: "Agent sign-up", href: "/auth/agent" },
      back("accounts"),
      home,
    ],
  },
  acct_author: {
    say: [
      "Use 'Get started!' in the header, then Author. Sign-up runs in three steps: Identity → Biography & languages → Review.",
      "Once inside, your account page lets you edit personal details and open a book request from the '+' panel.",
    ],
    options: [
      { label: "Open the author entrance", href: "/auth/author" },
      { label: "How do I submit a book?", to: "author_submit" },
      { label: "Edit my details", to: "acct_edit" },
      home,
    ],
  },
  acct_agent: {
    say: [
      "Use 'Get started!' then Literary agent. Sign-up runs in three steps: Identity → Agency & territory → Review.",
      "Inside, you get your profile plus a basket (cart icon, top right) tracking every title you've asked to work with.",
    ],
    options: [
      { label: "Open the agent entrance", href: "/auth/agent" },
      { label: "How do I request a title?", to: "agent_request" },
      { label: "What do the statuses mean?", to: "agent_status" },
      home,
    ],
  },
  acct_edit: {
    say: [
      "Sign in, open the account menu at top right and choose 'My account'. Name, contact details, languages and agency information are all editable there and save immediately.",
    ],
    options: [
      { label: "Author account", href: "/account" },
      { label: "Agent console", href: "/agent" },
      home,
    ],
  },

  /* ---------------- author submissions ---------------- */
  menu_author: {
    say: ["Welcome. Authors and estates work through the author entrance.", "What do you need?"],
    options: [
      { label: "Create an author account", href: "/auth/author" },
      { label: "Submit a new book", to: "author_submit" },
      { label: "Solicited vs unsolicited", to: "author_solicit" },
      { label: "Track my submission", to: "author_track" },
      { label: "What TSEHAI publishes", to: "author_scope" },
      { label: "Read the guidelines", href: "/guidelines" },
      home,
    ],
  },
  author_submit: {
    say: [
      "From your account page, click the '+' panel to open the book request form. It runs in steps: Title & metadata → Solicitation & referral → Synopsis and review.",
      "A rights manager reviews it and sets the status to approved, rejected or pending.",
    ],
    options: [
      { label: "Open my account", href: "/account" },
      { label: "Solicited vs unsolicited", to: "author_solicit" },
      { label: "What should the synopsis contain?", to: "author_synopsis" },
      { label: "Read the full guidelines", href: "/guidelines" },
      home,
    ],
  },
  author_solicit: {
    say: [
      "Unsolicited means nobody at TSEHAI invited the submission — still accepted, just slower.",
      "If an editor, published author or partner institution invited or referred you, choose 'referred' or 'solicited' in step two and add the referrer's name and reference. Referred submissions are read first.",
    ],
    options: [
      { label: "Start a book request", href: "/account" },
      { label: "How long does review take?", to: "author_track" },
      home,
    ],
  },
  author_synopsis: {
    say: [
      "Aim for 200–400 words: subject, argument or story, intended readership, why TSEHAI, and the manuscript's completion state. Include language, word count and whether a translation exists.",
    ],
    options: [{ label: "Read the guidelines", href: "/guidelines" }, back("author_submit"), home],
  },
  author_track: {
    say: [
      "Your account page lists every request with a live status badge: Pending (in the queue), Approved (moving to acquisitions) or Rejected.",
      "Reviews typically take several weeks; referred submissions are faster.",
    ],
    options: [{ label: "Open my account", href: "/account" }, home],
  },
  author_scope: {
    say: [
      "TSEHAI publishes Ethiopian and Horn of Africa letters: history, art history, biography, reference and bibliography, poetry and fiction, plus translations into and out of Amharic, Oromo, Tigrinya and English.",
    ],
    options: [
      { label: "See the catalogue", href: "/catalogue" },
      { label: "Read the guidelines", href: "/guidelines" },
      home,
    ],
  },

  /* ---------------- agents ---------------- */
  menu_agent: {
    say: ["Welcome. Literary agents work through their own entrance and basket.", "What do you need?"],
    options: [
      { label: "Create an agent account", href: "/auth/agent" },
      { label: "Request to work with a title", to: "agent_request" },
      { label: "My basket & statuses", to: "agent_status" },
      { label: "'Contact literary agents' — what now?", to: "agent_contact" },
      { label: "Territories & rights sought", to: "agent_terms" },
      home,
    ],
  },
  agent_request: {
    say: [
      "Sign in as an agent, then open the request flow from the agent console. Three steps: Title → Terms (territory and rights sought) → Message.",
      "The rights desk reviews it and updates the status in your basket.",
    ],
    options: [
      { label: "Open the agent console", href: "/agent" },
      { label: "Check rights availability first", to: "rights_langs" },
      { label: "What do the statuses mean?", to: "agent_status" },
      home,
    ],
  },
  agent_status: {
    say: [
      "The cart icon at top right holds every title you've requested. Three statuses:",
      "Pending — with the rights desk. Rejected — unavailable for that territory or language. Contact literary agents — a likely yes; the desk wants to talk terms.",
    ],
    options: [
      { label: "Open my basket", href: "/agent" },
      { label: "I got 'Contact literary agents'", to: "agent_contact" },
      home,
    ],
  },
  agent_contact: {
    say: [
      "Good news — that status means the rights desk is open to discussing the licence. Open the request in your basket and the released contact details appear in a panel: rights@tsehaipublishers.com, +1 (323) 431-0090.",
      "Reply with your offer terms, advance and schedule.",
    ],
    options: [{ label: "Open my basket", href: "/agent" }, back("agent_status"), home],
  },
  agent_terms: {
    say: [
      "Territory is the market you want (e.g. North America, EU, Gulf). Rights sought can be translation, audio, serial, dramatic or full volume rights.",
      "Be specific — vague requests are usually reset to pending for clarification.",
    ],
    options: [{ label: "Start a request", href: "/agent" }, back("menu_agent"), home],
  },

  /* ---------------- staff ---------------- */
  menu_staff: {
    say: [
      "The rights console is separate from the public portal and opens in its own tab. It requires four credentials: email, password one, password two and an organisational code.",
    ],
    options: [
      { label: "Open the rights console", href: "/rights", newTab: true },
      { label: "What can staff see there?", to: "staff_scope" },
      { label: "Staff roles & permissions", href: "/team" },
      { label: "I can't get in", to: "trouble_login" },
      home,
    ],
  },
  staff_scope: {
    say: [
      "The console lists every account (authors and agents), every author book request with its solicitation status, and every agent collaboration request with territory and rights sought.",
      "Staff can approve, reject, reset to pending, or release contact details to an agent.",
    ],
    options: [{ label: "Open the console", href: "/rights", newTab: true }, home],
  },

  /* ---------------- misc ---------------- */
  guidelines: {
    say: [
      "The guidelines page carries the step-by-step route for both authors and agents, plus the rules on formats, exclusivity, response times and conduct.",
    ],
    options: [
      { label: "Open the guidelines", href: "/guidelines" },
      { label: "Author steps in short", to: "author_submit" },
      { label: "Agent steps in short", to: "agent_request" },
      home,
    ],
  },
  about: {
    say: [
      "TSEHAI Publishers, established 2007, Los Angeles and Addis Ababa. The portal is our master bibliographic and author record.",
    ],
    options: [
      { label: "Meet the team", href: "/team" },
      { label: "What TSEHAI publishes", to: "author_scope" },
      { label: "Contact us", to: "contact" },
      home,
    ],
  },

  trouble: {
    say: ["Sorry about that. What's happening?"],
    options: [
      { label: "I can't sign in", to: "trouble_login" },
      { label: "A page won't load", to: "trouble_page" },
      { label: "An image or cover is missing", to: "trouble_image" },
      { label: "My request vanished", to: "trouble_request" },
      { label: "The dropdown keeps closing", to: "trouble_menu" },
      { label: "Report it to a human", to: "contact" },
      home,
    ],
  },
  trouble_login: {
    say: [
      "Check you're on the right entrance — authors and agents have different sign-ins, and staff use the console tab.",
      "If the password is right but access fails, the account may be registered under the other role.",
    ],
    options: [
      { label: "Author entrance", href: "/auth/author" },
      { label: "Agent entrance", href: "/auth/agent" },
      { label: "Rights console", href: "/rights", newTab: true },
      { label: "Still stuck — contact us", to: "contact" },
      home,
    ],
  },
  trouble_page: {
    say: ["Try a refresh first — the portal loads data live. If it persists, go back to the home page and navigate again."],
    options: [{ label: "Go to the home page", href: "/" }, { label: "Report it", to: "contact" }, home],
  },
  trouble_image: {
    say: [
      "Covers and portraits fall back to a typographic placeholder when artwork isn't cleared yet. That's expected, not an error — the record is still complete.",
    ],
    options: [back("trouble"), home],
  },
  trouble_request: {
    say: [
      "Requests only appear while you're signed in to the account that made them. Check the account menu at top right shows your name; if it shows 'Get started!', you've been signed out.",
    ],
    options: [
      { label: "Author account", href: "/account" },
      { label: "Agent console", href: "/agent" },
      { label: "Report it", to: "contact" },
      home,
    ],
  },
  trouble_menu: {
    say: [
      "The Authors and Catalogue dropdowns stay open while your cursor is anywhere inside them, with a short delay on exit. If one closes instantly, your pointer likely crossed outside the panel edge.",
    ],
    options: [back("trouble"), home],
  },

  contact: {
    say: [
      "Rights & permissions: rights@tsehaipublishers.com · +1 (323) 431-0090",
      "General & submissions: info@tsehaipublishers.com. Placeholder details for now.",
    ],
    options: [
      { label: "Meet the team", href: "/team" },
      { label: "Read the guidelines", href: "/guidelines" },
      done,
      home,
    ],
  },

  closing: {
    say: ["Happy to help. The catalogue is always open — come back any time."],
    options: [
      { label: "Start again", to: "start" },
      { label: "Main menu", to: "menu" },
    ],
  },
};
