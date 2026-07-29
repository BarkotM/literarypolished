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
    id: "senedu-gebru",
    name: "Senedu Gebru",
    amharicName: "ስንዱ ገብሩ",
    lifespan: "1916–2009",
    born: 1916,
    origin: "Addis Ababa, Ethiopia",
    languages: ["Amharic", "English", "French"],
    tagline: "Educator, parliamentarian, and the first woman to publish a book of verse in Amharic.",
    bio: [
      "Senedu Gebru was an educator, memoirist and stateswoman whose life traced the whole arc of twentieth-century Ethiopia. Educated in Switzerland and returned home on the eve of the Italian occupation, she was interned with her family at Asinara and Ponza — an exile that would later supply the emotional spine of her writing.",
      "As director of the Empress Menen School she rebuilt girls' education in Addis Ababa almost from nothing, and in 1957 she became the first woman elected to the Ethiopian parliament, later serving as its deputy speaker. Her literary work grew directly out of that public vocation: books written not for a coterie but for students, teachers and households.",
      "Her legacy is two-fold. The Empress Menen School Cook Book stands as one of the earliest printed records of Ethiopian domestic science, preserving measurements, fasting-season menus and household economy in both Amharic and English. Ye-Libe Metsihaf gathered verse, memoir and short drama into a volume that generations of Ethiopian schoolchildren read aloud.",
      "TSEHAI holds her titles as part of its archival preservation programme, and her work remains foundational to any study of women's writing in the Horn of Africa.",
    ],
    qa: [
      {
        q: "You wrote in two languages at once. Why?",
        a: "Because the kitchen and the classroom were both bilingual. A recipe written only in English would have been a foreign object in an Ethiopian household; written only in Amharic it could not travel. I wanted the book to be usable on both sides of the door.",
      },
      {
        q: "What did exile teach you about writing?",
        a: "That memory is a discipline, not a mood. On the island we had nothing to read and nothing to write on, so we told each other our lives in order. When I finally had paper again I already knew the shape of every sentence.",
      },
      {
        q: "What did you want your students to take from your books?",
        a: "Method. Sentiment fades, method survives. If a girl learned to measure, to plan, to record — she could run a household, a school, or a country.",
      },
    ],
    books: [
      {
        id: "the-empress-menen-school-cook-book",
        title: "The Empress Menen School Cook Book",
        subtitle: "Domestic science and household record from the Empress Menen School",
        year: 1945,
        era: "1900–1959",
        genre: "Domestic Science / Culinary History",
        badge: "1945 Culinary Archive",
        originalLanguage: "Amharic & English",
        translations: [],
        availability: "Special Archival Collection / TSEHAI Archives",
        pages: 164,
        archiveId: "TSEHAI-ARC-1945-001",
        publicationDate: "1945, Addis Ababa",
        classifications: ["Culinary History", "Domestic Science", "Women's Education", "Ethiopian Studies"],
        description:
          "Compiled for the students of the Empress Menen School, this dual-language volume is among the earliest printed records of Ethiopian domestic science — fasting-season menus, spice preparation, household budgeting and table service, set down with a teacher's exactness.",
        excerptTitle: "From the Preface",
        excerpt:
          "A kitchen is a classroom in which no lesson is theoretical. What is measured wrongly is tasted wrongly; what is planned poorly is eaten poorly. Let the student therefore keep her book beside her pot, and write in it what she learns, so that the next girl inherits knowledge and not rumour.",
        excerptOriginal: "ወጥ ቤት ትምህርት ቤት ነው፤ የተማርሽውን ጻፊው።",
        retailers: [
          { label: "TSEHAI Store", note: "Archival facsimile — enquire" },
          { label: "Digital Archival Copy", note: "Reading-room access" },
          { label: "University Library Access", note: "Interlibrary loan" },
        ],
        praise: [
          {
            quote:
              "The single most important printed source on mid-century Ethiopian household practice — and the only one written by the women who did the work.",
            source: "Journal of Ethiopian Studies",
          },
          {
            quote: "Reads less like a cookbook than like a civic programme served at table.",
            source: "Addis Review",
          },
        ],
      },
      {
        id: "ye-libe-metsihaf",
        title: "Ye-Libe Metsihaf",
        subtitle: "The Book of My Heart",
        originalTitle: "የልቤ መጽሐፍ",
        year: 1950,
        era: "1900–1959",
        genre: "Memoir / Short Drama",
        badge: "Literary Classic",
        originalLanguage: "Amharic",
        translations: [],
        availability: "National Library Archives / Out of Print",
        pages: 212,
        archiveId: "TSEHAI-ARC-1950-004",
        publicationDate: "1950, Addis Ababa",
        classifications: ["Memoir", "Verse", "Short Drama", "Ethiopian Literature"],
        description:
          "Verse, memoir and short drama gathered into one volume: the internment years, the return, and the rebuilding of a school. For decades its pages were read aloud in Ethiopian classrooms.",
        excerptTitle: "From 'The Island'",
        excerpt:
          "We counted the days by the boats. When no boat came we counted by the bread. My mother said: a prisoner who keeps a calendar is not yet a prisoner of the heart.",
        excerptOriginal: "እስረኛ ቀን የሚቆጥር ገና የልብ እስረኛ አይደለም።",
        retailers: [
          { label: "Local Bookstores", note: "Out of print — used copies" },
          { label: "Digital Archival Copy", note: "TSEHAI reading room" },
          { label: "University Library Access", note: "National Library holdings" },
        ],
        praise: [
          {
            quote: "The first modern Amharic book in which a woman speaks in her own voice and expects to be believed.",
            source: "Ethiopian Herald, retrospective",
          },
        ],
      },
    ],
  },
  {
    id: "bealu-girma",
    name: "Bealu Girma",
    amharicName: "በዓሉ ግርማ",
    lifespan: "1939–1984",
    born: 1939,
    origin: "Illubabor, Ethiopia",
    languages: ["Amharic", "English"],
    tagline: "Journalist and novelist who wrote the book that cost him his life.",
    bio: [
      "Bealu Girma was the most widely read Ethiopian novelist of his generation and, briefly, one of the most powerful editors in the country. He edited Addis Zemen and the Ethiopian Herald and served in the Ministry of Information under the Derg — a proximity to power that gave his final novel its terrifying accuracy.",
      "His early fiction — Kadmas Bashager, Ye'Hilina Debdabbe, Deraseew — established a fast, cinematic Amharic prose style built out of newsroom sentences. Readers who had been taught that literature meant elevated diction found instead dialogue that sounded like the street.",
      "In 1983 he published Oromay, a novel of the Red Star campaign in Eritrea in which the machinery of the revolution is shown as vain, brutal and self-deceiving. The book sold out within days, was banned, and Bealu Girma disappeared in February 1984. He has never been found.",
      "Oromay is now read across Ethiopia and the diaspora as the defining political novel of the Derg years, and its author as the measure of what writing under a regime can cost.",
    ],
    qa: [
      {
        q: "Journalism or the novel — which came first for you?",
        a: "The newsroom taught me speed and the novel taught me consequence. A report ends when the paper is printed. A novel keeps asking the question after you have put it down.",
      },
      {
        q: "Did you know what Oromay would do?",
        a: "I knew what it said. A writer who calculates what a sentence will cost him has already written a different sentence. I preferred to write the true one and find out afterwards.",
      },
      {
        q: "Why that title — 'Oromay'?",
        a: "It is a Tigrinya word: it is finished, it is over. Everyone in the book keeps announcing victory. The title answers them.",
      },
    ],
    books: [
      {
        id: "oromay",
        title: "Oromay",
        subtitle: "A novel of the Red Star campaign",
        originalTitle: "ኦሮማይ",
        year: 1983,
        era: "1960–1989",
        genre: "Political Thriller",
        badge: "Banned / Political Thriller",
        originalLanguage: "Amharic",
        translations: ["English"],
        availability: "Reprint Available / Bookstore",
        pages: 348,
        archiveId: "TSEHAI-BG-1983-011",
        publicationDate: "1983, Addis Ababa",
        classifications: ["Political Fiction", "Banned Books", "Ethiopian Literature", "Derg Period"],
        description:
          "A propaganda officer is sent north with the Red Star campaign and finds a war that no communiqué can describe. Published in 1983, banned within weeks, and followed by the disappearance of its author.",
        excerptTitle: "Chapter One",
        excerpt:
          "They gave me a typewriter, a jeep and a sentence I was to repeat until it became true. I repeated it in Asmara, I repeated it in Massawa, and each time I said it the sentence grew thinner, until at last there was nothing between the words and the sand.",
        excerptOriginal: "ኦሮማይ — አለቀ፣ ተፈጸመ።",
        retailers: [
          { label: "TSEHAI Store", note: "Reprint in stock" },
          { label: "Local Bookstores", note: "Addis & diaspora retailers" },
          { label: "Digital Archival Copy", note: "eBook edition" },
          { label: "University Library Access", note: "Widely held" },
        ],
        praise: [
          {
            quote: "The novel that told the truth about the Red Star campaign while the campaign was still being celebrated.",
            source: "Ethiopian Literary Review",
          },
          {
            quote: "A thriller in form and an indictment in substance. Its author paid for every page.",
            source: "Index on Censorship",
          },
          {
            quote: "No Amharic novel has been passed hand to hand more often, or more quietly.",
            source: "Tsehai Publishers",
          },
        ],
      },
    ],
  },
  {
    id: "maaza-mengiste",
    name: "Maaza Mengiste",
    lifespan: "b. 1974",
    born: 1974,
    origin: "Addis Ababa, Ethiopia / New York, USA",
    languages: ["English", "Amharic", "Italian"],
    tagline: "Novelist of the Italo-Ethiopian war and of the women erased from its photographs.",
    bio: [
      "Maaza Mengiste was born in Addis Ababa in 1974 and left Ethiopia as a child during the revolution — a displacement that runs beneath both of her novels. Her first, Beneath the Lion's Gaze, followed a single family through the fall of Haile Selassie and was named one of the best contemporary African books.",
      "The Shadow King, published in 2019, reconstructs the 1935 Italian invasion through the women who fought it: a servant girl who becomes a soldier, a cook who becomes a commander, a photographer's archive that will not stay silent. It was shortlisted for the Booker Prize.",
      "Mengiste works as much with photographs as with documents. Her research into the visual record of the Italo-Ethiopian war — much of it taken by the occupiers — informs a prose style built out of framing, exposure and what falls outside the picture.",
      "She is a Fulbright Scholar, a professor at Queens College, and a persistent advocate for African archives held abroad. Her work has been translated into more than a dozen languages.",
    ],
    qa: [
      {
        q: "The Shadow King began as a different book. What changed it?",
        a: "A family photograph. I learned that my great-grandmother had gone to war, and I realised I had written an entire draft about men because that is the only version I had been handed. I started again.",
      },
      {
        q: "You write in English about Amharic lives. How do you hold both?",
        a: "I let the English bend. There are sentences in the novel that are shaped like Amharic sentences, and I did not smooth them out. The reader should feel a second language pressing against the glass.",
      },
      {
        q: "What is the responsibility of the historical novelist?",
        a: "To refuse the tidy version. The archive was assembled by the people with cameras, and they were the invaders. Fiction is one of the few instruments we have for photographing the other side of the room.",
      },
    ],
    books: [
      {
        id: "the-shadow-king",
        title: "The Shadow King",
        subtitle: "A novel of the 1935 Italian invasion of Ethiopia",
        year: 2019,
        era: "1990–Present",
        genre: "Historical Fiction",
        badge: "Booker Shortlist",
        originalLanguage: "English",
        translations: ["Italian", "Spanish", "Amharic"],
        availability: "Available Worldwide (Major Retailers & TSEHAI Store)",
        pages: 428,
        archiveId: "ISBN 978-0-393-08356-7",
        publicationDate: "September 2019",
        classifications: ["Historical Fiction", "War Literature", "African Literature", "Women's History"],
        description:
          "Ethiopia, 1935. As Mussolini's army advances, an orphaned servant named Hirut takes up a rifle — and helps invent a shadow emperor to hold a country together. A novel about who is permitted to be a soldier, and who is permitted to be remembered.",
        excerptTitle: "Prologue",
        excerpt:
          "She wants to tell him that she was a soldier once, that she carried a rifle taller than herself across a country that did not believe she could hold it. She wants to say: there is a photograph of me somewhere in Italy, and the man who took it did not know my name.",
        retailers: [
          { label: "TSEHAI Store", note: "Signed copies available" },
          { label: "Local Bookstores", note: "Order worldwide" },
          { label: "Digital Archival Copy", note: "eBook & audiobook" },
          { label: "University Library Access", note: "Course adoption" },
        ],
        praise: [
          { quote: "A brilliant novel, lyrically lifting history off the page.", source: "The Booker Prize, 2020 shortlist citation" },
          { quote: "Mengiste writes with the authority of a historian and the ear of a poet.", source: "The New York Times" },
          { quote: "Restores to the record the women who were always in the frame and never in the caption.", source: "The Guardian" },
        ],
      },
    ],
  },
  {
    id: "tsegaye-gabre-medhin",
    name: "Tsegaye Gabre-Medhin",
    amharicName: "ጸጋዬ ገብረመድኅን",
    lifespan: "1936–2006",
    born: 1936,
    origin: "Boda, Ambo, Ethiopia",
    languages: ["Amharic", "Oromo", "English", "Geʽez"],
    tagline: "Poet Laureate of Ethiopia; dramatist of kings, peasants and the Nile.",
    bio: [
      "Tsegaye Gabre-Medhin was named Ethiopia's Poet Laureate in 1966 and remained, until his death in 2006, the country's central dramatic voice. He wrote in Amharic, Oromo and English, and translated Shakespeare, Molière and Brecht into an Amharic stage idiom that had not previously existed.",
      "As director of the Ethiopian National Theatre he built a repertory out of Ethiopian history — Tewdros, Petros at the Hour, Collision of Altars — insisting that a national stage required national tragedy rather than imported drawing rooms.",
      "His verse drama Tewdros returns to Emperor Tewodros II, the reformer-tyrant who unified a fractured empire and shot himself rather than surrender at Maqdala. Written in high Amharic verse, it is the most-performed serious play in the Ethiopian repertoire.",
      "Exiled in his final years to the United States, he continued to write on the Nile, on Africa's classical past, and on the obligations of the poet to the people who cannot read him.",
    ],
    qa: [
      {
        q: "Why verse, when the modern theatre had abandoned it?",
        a: "Because Amharic is a verse language. Our proverbs are in metre, our liturgy is in metre, our insults are in metre. To write an Ethiopian king in prose would be to lower him below the level of ordinary speech.",
      },
      {
        q: "Tewodros is both hero and tyrant in your play. Deliberate?",
        a: "He is Ethiopia. A man who can see a hundred years ahead and cannot govern the man in front of him. Tragedy requires that we admire what destroys us.",
      },
      {
        q: "What did translating Shakespeare give you?",
        a: "A workshop. I took Macbeth apart in English and rebuilt it in Amharic, and by the end I knew where the joints of a play are.",
      },
    ],
    books: [
      {
        id: "tewdros",
        title: "Tewdros",
        subtitle: "A verse drama in five acts",
        originalTitle: "ቴዎድሮስ",
        year: 1986,
        era: "1960–1989",
        genre: "Verse Drama",
        badge: "Verse Drama",
        originalLanguage: "Amharic",
        translations: [],
        availability: "In Print / Educational Distributors",
        pages: 186,
        archiveId: "TSEHAI-TGM-1986-007",
        publicationDate: "1986, Addis Ababa",
        classifications: ["Drama", "Verse", "Ethiopian History", "National Theatre"],
        description:
          "Emperor Tewodros II unifies an empire by force and loses it to his own certainty. Tsegaye's five-act verse tragedy remains the most performed serious play in the Ethiopian repertoire.",
        excerptTitle: "Act V, Maqdala",
        excerpt:
          "I made a road where there was none, and now the enemy walks upon it.\nLet no man say Tewodros was defeated by a cannon.\nHe was defeated by the hundred years he could see\nand the one morning he could not.",
        excerptOriginal: "መንገድ ሠራሁ፤ ጠላትም በእሱ መጣ።",
        retailers: [
          { label: "TSEHAI Store", note: "In print" },
          { label: "Local Bookstores", note: "Educational distributors" },
          { label: "University Library Access", note: "Standard curriculum text" },
        ],
        praise: [
          { quote: "The founding text of the modern Ethiopian stage.", source: "Ethiopian National Theatre" },
          { quote: "Tsegaye gave Amharic a tragic register it had not possessed since the Geʽez hymnody.", source: "African Theatre Quarterly" },
        ],
      },
    ],
  },
  {
    id: "haddis-alemayehu",
    name: "Haddis Alemayehu",
    amharicName: "ሐዲስ ዓለማየሁ",
    lifespan: "1910–2003",
    born: 1910,
    origin: "Gojjam, Ethiopia",
    languages: ["Amharic", "English", "Geʽez"],
    tagline: "Author of the novel most Ethiopians name first: Fiqir Iske Meqabir.",
    bio: [
      "Haddis Alemayehu was a diplomat, foreign minister and novelist whose single great book reorganised Amharic fiction. Educated in the church tradition and then in the new imperial schools, he joined the resistance during the Italian occupation and spent years in prison in Italy.",
      "Published in 1965, Fiqir Iske Meqabir — Love unto Crypt — tells of Bezabih and Seble Wongel, whose love cannot survive the feudal order of rural Gojjam. Beneath the romance is a precise, unforgiving anatomy of landlordism, church authority and the position of women.",
      "The novel's achievement is linguistic as much as social: Haddis wrote a supple, speakable Amharic that later novelists treated as a standard. It has never gone out of print in Ethiopia and remains the most widely taught Ethiopian novel.",
      "He served as Ethiopia's Minister of Foreign Affairs and as ambassador before withdrawing from public life, and continued to publish essays and memoir into his eighties.",
    ],
    qa: [
      {
        q: "Is Fiqir Iske Meqabir a love story or a political novel?",
        a: "It is a love story, and that is why it is a political novel. If two people cannot marry, ask who forbids it and by what right. The answer is the whole system.",
      },
      {
        q: "You wrote in a plainer Amharic than your contemporaries.",
        a: "I wanted my mother to be able to read it. Ornament belongs to the church, where it is earned. A novel should sound like a person speaking in a room.",
      },
      {
        q: "Did diplomacy help or hinder the writing?",
        a: "It taught me patience and it taught me how power explains itself. Both are useful for a novelist. Neither leaves much time for writing.",
      },
    ],
    books: [
      {
        id: "fiqir-iske-meqabir",
        title: "Fiqir Iske Meqabir",
        subtitle: "Love unto Crypt",
        originalTitle: "ፍቅር እስከ መቃብር",
        year: 1965,
        era: "1960–1989",
        genre: "Classic Novel",
        badge: "Amharic Masterpiece",
        originalLanguage: "Amharic",
        translations: ["English (Love unto Crypt)"],
        availability: "In Print / Retailers & Digital Libraries",
        pages: 512,
        archiveId: "TSEHAI-HA-1965-002",
        publicationDate: "1965, Addis Ababa",
        classifications: ["Classic Novel", "Romance", "Social Realism", "Ethiopian Literature"],
        description:
          "Bezabih, a tutor of modest birth, and Seble Wongel, the daughter of a Gojjam landlord, love each other in a society organised to prevent it. The most widely read and most widely taught novel in Amharic.",
        excerptTitle: "Book One, Chapter Three",
        excerpt:
          "He had been taught that a man's station is written before his birth and cannot be revised by feeling. He believed this entirely, and he loved her anyway, and between those two facts he lived the rest of his life.",
        excerptOriginal: "ፍቅር እስከ መቃብር።",
        retailers: [
          { label: "TSEHAI Store", note: "Amharic & English editions" },
          { label: "Local Bookstores", note: "Continuously in print" },
          { label: "Digital Archival Copy", note: "Digital libraries" },
          { label: "University Library Access", note: "Core curriculum" },
        ],
        praise: [
          { quote: "The novel by which Amharic prose measures itself.", source: "Journal of Ethiopian Studies" },
          { quote: "A romance that quietly dismantles the order it is set in.", source: "African Book Review" },
        ],
      },
    ],
  },
  {
    id: "zera-yacob",
    name: "Zera Yacob",
    amharicName: "ዘርአ ያዕቆብ",
    lifespan: "1600–1692",
    born: 1600,
    origin: "Aksum, Ethiopia",
    languages: ["Geʽez", "Amharic"],
    tagline: "Seventeenth-century rationalist; author of the Hatata.",
    bio: [
      "Zera Yacob was born near Aksum in 1600 and trained in the Ethiopian church schools in psalmody, qene poetry and scriptural interpretation. Caught in the religious conflict that followed the Jesuit mission and the conversion of Emperor Susenyos, he fled Aksum and lived two years alone in a cave beside the Tekeze river.",
      "It was there, by his own account, that he composed the method set out in the Hatata: that every claim — scriptural, clerical or customary — must be submitted to the light of reason, and that reason is given equally to all people by their creator.",
      "Written in Geʽez in 1667 at the request of his patron's son, the Hatata argues for religious tolerance, the equality of women and men, and the sufficiency of natural reason, decades before comparable arguments appeared in Europe. Its authorship was contested by twentieth-century European scholars; that dispute has itself become a case study in how African intellectual history is received.",
      "The text is now taught as a founding document of African philosophy and is available in open-access digital editions through TSEHAI's archive programme.",
    ],
    qa: [
      {
        q: "Why write in the first person rather than as a treatise?",
        a: "Because I could not argue from authority — every authority around me was at war with another. I could only argue from what one man, alone in a cave, was able to establish for himself and offer to be tested.",
      },
      {
        q: "On the equality of men and women you were unusually direct.",
        a: "The creator did not give one intellect to the man and a lesser to the woman. Whoever says so is defending a custom, not describing a creation.",
      },
      {
        q: "What is the Hatata's method?",
        a: "Inquiry. That is what the word means. You ask, you do not stop at the first answer that comforts you, and you accept only what reason can carry.",
      },
    ],
    books: [
      {
        id: "hatata",
        title: "Hatata",
        subtitle: "An Inquiry",
        originalTitle: "ሐተታ",
        year: 1667,
        era: "Pre-1900",
        genre: "Philosophy",
        badge: "Philosophy",
        originalLanguage: "Geʽez",
        translations: ["English", "Latin", "German"],
        availability: "Open Access Digital Archive / Academic Publishers",
        pages: 96,
        archiveId: "TSEHAI-ZY-1667-OA",
        publicationDate: "1667, Enfranz",
        classifications: ["Philosophy", "African Philosophy", "Rationalism", "Geʽez Literature"],
        description:
          "Composed in Geʽez in 1667, the Hatata submits scripture, clergy and custom alike to the test of reason, and argues for tolerance and for the equal rational capacity of all people. A founding text of African philosophy.",
        excerptTitle: "On the Light of Reason",
        excerpt:
          "I said in my heart: if I ask the priest, he answers from his book; if I ask the monk, he answers from his fast. But the light by which I judge their answers — who gave me that? And I understood that reason is not the property of a party, but the common gift, and that a truth which fears examination is not a truth.",
        excerptOriginal: "ሐተታ — መጠይቅ።",
        retailers: [
          { label: "Digital Archival Copy", note: "Open access — read now" },
          { label: "TSEHAI Store", note: "Annotated print edition" },
          { label: "University Library Access", note: "Academic publishers" },
        ],
        praise: [
          { quote: "A rationalist manifesto written in a cave above the Tekeze, decades before Europe's own.", source: "African Philosophy Review" },
          { quote: "The dispute over its authorship tells us more about European scholarship than about Zera Yacob.", source: "Journal of Ethiopian Studies" },
        ],
      },
    ],
  },
];

export const allBooks = authors.flatMap((a) => a.books.map((b) => ({ ...b, author: a })));

export const genres = [
  "All",
  "Historical Fiction",
  "Political Thriller",
  "Domestic Science / Culinary",
  "Philosophy",
  "Verse Drama",
  "Memoir",
  "Classic Novel",
];

export function genreMatches(chip: string, genre: string) {
  if (chip === "All") return true;
  const c = getSlug(chip).split("-")[0];
  return getSlug(genre).includes(c);
}

export function getAuthor(id: string) {
  return authors.find((a) => a.id === id);
}

export function getBook(id: string) {
  return allBooks.find((b) => b.id === id);
}

export const eras = ["All eras", "Pre-1900", "1900–1959", "1960–1989", "1990–Present"];