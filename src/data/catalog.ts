import { getSlug } from "@/lib/slug";

export type Book = {
  id: string;
  title: string;
  subtitle?: string;
  originalTitle?: string;
  year: number;
  era: "Pre-1900" | "1900–1959" | "1960–1989" | "1990–Present";
  genre: string;
  badge: string;
  originalLanguage: string;
  translations: string[];
  rights: { sold: string[]; held: string[]; negotiating: string[]; open: string[] };
  availability: string;
  pages: number;
  archiveId: string;
  publicationDate: string;
  classifications: string[];
  description: string;
  excerptTitle: string;
  excerpt: string;
  excerptOriginal?: string;
  retailers: { label: string; note: string }[];
  praise: { quote: string; source: string }[];
};

export type Author = {
  id: string;
  name: string;
  amharicName?: string;
  lifespan: string;
  born: number;
  origin: string;
  languages: string[];
  tagline: string;
  bio: string[];
  qa: { q: string; a: string }[];
  books: Book[];
};

export const authors: Author[] = [
  {
    id: "debebe-eshetu",
    name: "Debebe Eshetu",
    amharicName: "ደበበ እሸቱ",
    lifespan: "b. 1943",
    born: 1943,
    origin: "Addis Ababa, Ethiopia",
    languages: ["Amharic", "English"],
    tagline:
      "Actor, director and translator who brought a lost European account of Ethiopia back into Amharic.",
    bio: [
      "Debebe Eshetu belongs to the generation of Ethiopian performers who made the stage a civic instrument. Trained in theatre and film, he spent five decades moving between the National Theatre in Addis Ababa and international productions, and became one of the most recognisable voices in Amharic-language drama.",
      "His translation work grew out of that vocal discipline. Reading Roman Prochazka's 1935 polemic Abyssinia: The Powder Barrel, he recognised a document that Ethiopian readers had only ever encountered second-hand — a European argument about Ethiopia's fate, made on the eve of invasion, and never available in the language of the country it described.",
      "The resulting Amharic edition, ኢትዮጵያ የባሩድ በርሜል, is less a literal rendering than a performance: the rhetoric is kept intact so that Ethiopian readers can hear exactly how the case against their sovereignty was constructed.",
      "TSEHAI publishes the edition as part of its programme of returning colonial-era documents to Ethiopian readerships in Ethiopian languages.",
    ],
    qa: [
      {
        q: "Why translate a hostile book?",
        a: "Because a hostile book tells you what your enemy believed, in his own vocabulary. We had heard about this pamphlet for eighty years. Reading it is different from hearing about it.",
      },
      {
        q: "How did acting shape the translation?",
        a: "An actor listens for intention beneath a line. Prochazka's sentences are calm and reasonable on the surface and quite violent underneath. I translated the violence, not only the calm.",
      },
      {
        q: "Who is this edition for?",
        a: "For students in Addis Ababa who can now read the argument themselves rather than take my generation's word for what it said.",
      },
    ],
    books: [
      {
        id: "ethiopia-the-powder-barrel",
        title: "Ethiopia: The Powder Barrel",
        subtitle: "Roman Prochazka's 1935 polemic, translated into Amharic",
        originalTitle: "ኢትዮጵያ የባሩድ በርሜል",
        year: 2019,
        era: "1990–Present",
        genre: "History / Translation",
        badge: "Archival Translation",
        originalLanguage: "German (via English)",
        translations: ["Amharic"],
        rights: { sold: ["Amharic (Ethiopia)"], held: ["World English", "German"], negotiating: ["Tigrinya", "Italian"], open: ["French", "Arabic", "Audio", "Film & TV"] },
        availability: "In print — TSEHAI Publishers",
        pages: 218,
        archiveId: "TSEHAI-TRN-2019-004",
        publicationDate: "2019, Los Angeles / Addis Ababa",
        classifications: ["Ethiopian Studies", "Colonial History", "Translation", "Propaganda Studies"],
        description:
          "First Amharic edition of Roman Prochazka's notorious 1935 tract, published in the months before the Italian invasion and widely circulated to justify it. Debebe Eshetu's translation restores the text to Ethiopian readers with its rhetoric intact, framed by a translator's introduction on how the argument was built and who it was built for.",
        excerptTitle: "From the Translator's Introduction",
        excerpt:
          "He does not shout. That is the first thing an Ethiopian reader should notice. The book speaks in the measured tone of a man describing weather, and what it describes is the removal of a country. I have kept that tone exactly, because the tone is the evidence.",
        excerptOriginal: "ኢትዮጵያ የባሩድ በርሜል — የተርጓሚ መግቢያ።",
        retailers: [
          { label: "TSEHAI Store", note: "Paperback — in stock" },
          { label: "Digital Archival Copy", note: "Reading-room access" },
          { label: "University Library Access", note: "Interlibrary loan" },
        ],
        praise: [
          {
            quote:
              "A necessary act of repatriation. The argument for conquest, finally legible in the language of the conquered.",
            source: "Journal of Ethiopian Studies",
          },
          { quote: "Eshetu translates rhetoric the way an actor delivers it — intact and audible.", source: "Addis Review" },
        ],
      },
    ],
  },
  {
    id: "raymond-silverman",
    name: "Raymond Silverman",
    lifespan: "b. 1950",
    born: 1950,
    origin: "Ann Arbor, Michigan / Addis Ababa",
    languages: ["English", "Amharic"],
    tagline:
      "Art historian of African visual culture, working with Neal Sobania on the living practice of Ethiopian church painting.",
    bio: [
      "Raymond Silverman is an art historian whose fieldwork has consistently refused the museum's preference for the finished object. Across four decades in West Africa and the Horn, he has followed makers rather than masterpieces — asking who commissioned a work, who paid, who watched it being made, and what happened to it afterwards.",
      "Ethiopian Church Art: Painters, Patrons, Purveyors, written with Neal Sobania, applies that method to the painted churches of highland Ethiopia. The book treats church painting not as a sealed medieval tradition but as an ongoing economy of artists, priests, donors and dealers, photographed and interviewed in situ.",
      "The result documents a practice that continues to change: pigments bought in market towns, iconographic conventions negotiated with parish councils, murals commissioned by returning diaspora families.",
      "The volume is illustrated throughout with the authors' own field photography.",
    ],
    qa: [
      {
        q: "Why photograph painters rather than paintings?",
        a: "Because a painting on a wall answers only one question — what it looks like. The painter answers all the others: who wanted it, what it cost, what was rejected.",
      },
      {
        q: "Is Ethiopian church painting a medieval tradition?",
        a: "It has a medieval inheritance and a completely contemporary economy. Both things are true, and only saying the first one is a kind of condescension.",
      },
      {
        q: "What surprised you most in the field?",
        a: "How much of the iconography is argued over. Nothing is simply inherited; every panel is a negotiation between painter, priest and patron.",
      },
    ],
    books: [
      {
        id: "ethiopian-church-art",
        title: "Ethiopian Church Art",
        subtitle: "Painters, Patrons, Purveyors",
        year: 2021,
        era: "1990–Present",
        genre: "Art History",
        badge: "Illustrated Field Study",
        originalLanguage: "English",
        translations: [],
        rights: { sold: ["North American English"], held: ["World English", "Digital"], negotiating: ["French", "Italian"], open: ["Amharic", "German", "Audio", "Documentary"] },
        availability: "In print — TSEHAI Publishers",
        pages: 296,
        archiveId: "TSEHAI-ART-2021-002",
        publicationDate: "2021, Los Angeles",
        classifications: ["Art History", "Ethiopian Studies", "Religious Studies", "Visual Anthropology"],
        description:
          "A field study of church painting in highland Ethiopia, written with Neal Sobania and illustrated with the authors' own photography. The book follows the whole chain of production — painters, the priests and parish councils who commission them, and the purveyors who move pigments, panels and finished works through regional markets.",
        excerptTitle: "From Chapter One",
        excerpt:
          "The mural is not the beginning of the story and it is certainly not the end of it. Somebody chose this saint over another saint. Somebody found the money. Somebody carried the pigment up from the market on a Thursday. To photograph only the wall is to photograph the last page of a book.",
        retailers: [
          { label: "TSEHAI Store", note: "Hardcover — in stock" },
          { label: "Course Adoption", note: "Examination copies" },
          { label: "University Library Access", note: "Institutional order" },
        ],
        praise: [
          {
            quote: "The rare art-historical book that treats living painters as authorities on their own tradition.",
            source: "African Arts",
          },
          { quote: "Photography and argument in genuine partnership.", source: "Journal of Ethiopian Studies" },
        ],
      },
    ],
  },
  {
    id: "thomas-ofcansky",
    name: "Thomas Ofcansky",
    lifespan: "b. 1947",
    born: 1947,
    origin: "Washington, D.C.",
    languages: ["English"],
    tagline:
      "Historian of the Horn of Africa and compiler of its most complete military bibliography.",
    bio: [
      "Thomas Ofcansky has spent a career on the least glamorous and most necessary work in African studies: finding out what has actually been written, and where it is. A historian of East Africa and the Horn, he is the author and co-author of reference works on Ethiopia, Eritrea, Somalia and Sudan.",
      "A Military Bibliography of the Horn of Africa, edited by Elias Wondimu, gathers thousands of entries spanning the nineteenth-century imperial campaigns, the Italian invasions, the Ogaden war, the Eritrean struggle and the conflicts of the present century.",
      "Each entry is annotated for provenance and reliability — a deliberate corrective to a literature in which propaganda and scholarship have circulated side by side for over a century.",
      "The volume is designed for researchers, librarians and the archives that serve them.",
    ],
    qa: [
      {
        q: "Why does the Horn need its own military bibliography?",
        a: "Because the literature is enormous, multilingual, and largely uncatalogued. Scholars have been rediscovering the same sources independently for fifty years.",
      },
      {
        q: "How do you handle propaganda in a bibliography?",
        a: "You list it and you say what it is. Suppressing it makes the record dishonest; listing it unannotated makes the record dangerous.",
      },
      {
        q: "What was the hardest material to trace?",
        a: "Unit histories and internal reports — the documents that were never meant to leave a ministry, and which turn up in private hands two generations later.",
      },
    ],
    books: [
      {
        id: "military-bibliography-horn-of-africa",
        title: "A Military Bibliography of the Horn of Africa",
        subtitle: "Compiled by Thomas Ofcansky, edited by Elias Wondimu",
        year: 2020,
        era: "1990–Present",
        genre: "Reference / Military History",
        badge: "Reference Standard",
        originalLanguage: "English",
        translations: [],
        rights: { sold: ["Institutional digital (North America)"], held: ["World English", "Digital archive"], negotiating: ["Arabic"], open: ["Amharic", "French", "Somali", "Audio"] },
        availability: "In print — TSEHAI Publishers",
        pages: 512,
        archiveId: "TSEHAI-REF-2020-001",
        publicationDate: "2020, Los Angeles",
        classifications: ["Reference", "Military History", "Ethiopian Studies", "Bibliography"],
        description:
          "An annotated bibliography of military writing on Ethiopia, Eritrea, Somalia, Djibouti and Sudan, from the imperial campaigns of the nineteenth century to the present. Thousands of entries in several languages, each annotated for provenance, reliability and archival location.",
        excerptTitle: "From the Compiler's Note",
        excerpt:
          "A bibliography is an argument about what exists. Every omission is a claim, and every inclusion is a responsibility. Where a source is propaganda I have said so; where its authorship is disputed I have said that too. The reader may disagree with my judgements, but will not be able to say they were hidden.",
        retailers: [
          { label: "TSEHAI Store", note: "Hardcover — in stock" },
          { label: "University Library Access", note: "Standing order" },
          { label: "Digital Archival Copy", note: "Searchable edition" },
        ],
        praise: [
          { quote: "Immediately the standard reference. Nothing else in the field comes close to its coverage.", source: "Northeast African Studies" },
          { quote: "Annotation is what makes it scholarship rather than a list.", source: "African Affairs" },
        ],
      },
    ],
  },
  {
    id: "james-quirin",
    name: "James Quirin",
    lifespan: "b. 1946",
    born: 1946,
    origin: "Nashville, Tennessee",
    languages: ["English", "Geʽez", "Amharic"],
    tagline:
      "Historian of Ethiopia in world history, and of the Beta Israel over five centuries.",
    bio: [
      "James Quirin is a historian of Ethiopia whose long study of the Beta Israel established a model for writing the history of a community that outside scholarship had persistently mythologised. His work insists that Ethiopian history is world history, not a regional exception to it.",
      "Historical Connections & Comparisons: Ethiopia & Pan-Africa in World History collects that argument into a single volume. It sets Ethiopian state formation, religious institutions and resistance to colonisation alongside developments elsewhere in Africa, Asia and the Atlantic world.",
      "The book pays particular attention to Ethiopia's symbolic role in Pan-African thought — the fact that a country's survival at Adwa became a political resource for people who had never seen it.",
      "Written for students as well as specialists, it is used widely in courses on African and world history.",
    ],
    qa: [
      {
        q: "Why comparison rather than a national history?",
        a: "Because 'Ethiopian exceptionalism' flatters and isolates in equal measure. Comparison is how you find out which parts of a history are actually unusual.",
      },
      {
        q: "What does Ethiopia mean in Pan-African thought?",
        a: "Proof. For a great many people across the Atlantic world, Adwa was the empirical answer to a claim about African incapacity. That is a historical fact about the diaspora as much as about Ethiopia.",
      },
      {
        q: "What do students misunderstand most?",
        a: "That the Ethiopian state was static. It was rebuilt repeatedly, and each rebuilding was contested.",
      },
    ],
    books: [
      {
        id: "historical-connections-comparisons",
        title: "Historical Connections & Comparisons",
        subtitle: "Ethiopia & Pan-Africa in World History",
        year: 2022,
        era: "1990–Present",
        genre: "History",
        badge: "Course Adopted",
        originalLanguage: "English",
        translations: [],
        rights: { sold: ["North American English", "UK & Commonwealth"], held: ["World English"], negotiating: ["Amharic", "Swahili"], open: ["French", "Portuguese", "Arabic", "Audio"] },
        availability: "In print — TSEHAI Publishers",
        pages: 344,
        archiveId: "TSEHAI-HIS-2022-003",
        publicationDate: "2022, Los Angeles",
        classifications: ["World History", "Ethiopian Studies", "Pan-Africanism", "Comparative History"],
        description:
          "Essays setting Ethiopian history within African and world history — state formation, religious institutions, slavery and emancipation, resistance to colonial conquest, and the place of Ethiopia in Pan-African political imagination from the nineteenth century onward.",
        excerptTitle: "From the Introduction",
        excerpt:
          "Ethiopia has been used as an exception for so long that the exception has become a way of not studying it. Once you place it beside other polities, the interesting questions return: not why Ethiopia was different, but which of its differences actually mattered, to whom, and when.",
        retailers: [
          { label: "TSEHAI Store", note: "Paperback — in stock" },
          { label: "Course Adoption", note: "Examination copies" },
          { label: "University Library Access", note: "Institutional order" },
        ],
        praise: [
          { quote: "Comparative history done without flattening either side of the comparison.", source: "Journal of African History" },
          { quote: "The clearest account yet of how Adwa became an idea.", source: "Northeast African Studies" },
        ],
      },
    ],
  },
  {
    id: "abiy-ahmed",
    name: "Abiy Ahmed",
    amharicName: "ዐቢይ አሕመድ",
    lifespan: "b. 1976",
    born: 1976,
    origin: "Beshasha, Oromia, Ethiopia",
    languages: ["Afaan Oromo", "Amharic", "English"],
    tagline:
      "Prime Minister of Ethiopia and Nobel Peace Prize laureate, author of the political philosophy of Medemer.",
    bio: [
      "Abiy Ahmed Ali is an Ethiopian politician who became Prime Minister in 2018 and was awarded the Nobel Peace Prize in 2019. Before entering national office he served in the military and in public administration, and completed doctoral study on conflict resolution — a background that shapes the argument of his writing.",
      "Medemer, published in Amharic, Afaan Oromo and Tigrinya editions, sets out an Ethiopian-centred political idea: that reform should synthesise rather than replace, adding what works to what already exists instead of importing whole ideologies that were designed elsewhere.",
      "The Afaan Oromo edition, Ida'amuu, carries the argument into one of Ethiopia's largest reading publics, and is catalogued here as a primary document of contemporary Ethiopian political thought.",
      "TSEHAI holds the bibliographic record for the international editions and their translation history.",
    ],
    qa: [
      {
        q: "What does Medemer mean?",
        a: "It is an Amharic word for adding together — synthesis. It argues that Ethiopian renewal comes from combining what our institutions already do well with what we can learn, rather than discarding one for the other.",
      },
      {
        q: "Why publish in Afaan Oromo?",
        a: "A political idea that cannot be read in the languages people actually think in is not a political idea, it is a slogan.",
      },
      {
        q: "Who is the book written for?",
        a: "For citizens, not for specialists. The argument is deliberately made in ordinary language.",
      },
    ],
    books: [
      {
        id: "medemer-oromo",
        title: "Medemer [Oromo]",
        subtitle: "The Afaan Oromo edition of Medemer",
        originalTitle: "Ida'amuu",
        year: 2019,
        era: "1990–Present",
        genre: "History / Political Thought",
        badge: "Primary Document",
        originalLanguage: "Amharic",
        translations: ["Afaan Oromo", "Tigrinya"],
        rights: {
          sold: ["Afaan Oromo", "Tigrinya", "Amharic"],
          held: ["World English", "Digital"],
          negotiating: ["French", "Arabic"],
          open: ["Swahili", "Portuguese", "Audio", "Documentary"],
        },
        availability: "In print — TSEHAI Publishers",
        pages: 286,
        archiveId: "978-1-59-907202-9",
        publicationDate: "15 November 2019, Los Angeles",
        classifications: ["Political Thought", "Ethiopian Studies", "Contemporary History", "Afaan Oromo"],
        description:
          "Medemer is the first book by Nobel Peace Prize laureate and Prime Minister of Ethiopia Abiy Ahmed since he came to office in 2018. The book advocates a fresh, Ethiopian-centric approach to the country's politics, arguing that half a century of imported ideologies failed because they were alien to Ethiopian problems and realities. This Afaan Oromo edition, Ida'amuu, brings the argument to Oromo readers in their own language.",
        excerptTitle: "From the opening chapter",
        excerpt:
          "Addition is not surrender. To add is to keep what has held us together and to bring to it what we have learned since. A country that only subtracts will eventually have nothing left to govern.",
        excerptOriginal: "Ida'amuun of'kennuu miti. Ida'amuun waan nu walitti qabe eeggachuudha.",
        retailers: [
          { label: "TSEHAI Store", note: "Paperback — $25.05" },
          { label: "Local Bookstores", note: "Order by ISBN" },
          { label: "Digital Archival Copy", note: "Reading-room access" },
        ],
        praise: [
          { quote: "A primary document of the Ethiopian reform period, and the first to be argued in Afaan Oromo.", source: "Addis Review" },
          { quote: "Whatever one makes of the politics, the publishing decision matters.", source: "Journal of Ethiopian Studies" },
        ],
      },
    ],
  },
];

export const allBooks = authors.flatMap((a) => a.books.map((b) => ({ ...b, author: a })));

export const genres = [
  "All",
  "History",
  "Art History",
  "Reference",
  "Translation",
  "Military History",
  "Ethiopian Studies",
];

export function genreMatches(chip: string, genre: string) {
  if (chip === "All") return true;
  const c = getSlug(chip).split("-")[0];
  return getSlug(genre).includes(c!);
}

export function getAuthor(id: string) {
  return authors.find((a) => a.id === id);
}

export function getBook(id: string) {
  return allBooks.find((b) => b.id === id);
}

export const eras = ["All eras", "Pre-1900", "1900–1959", "1960–1989", "1990–Present"];
