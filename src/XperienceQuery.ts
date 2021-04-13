type Page = {
  name: string;
  path: string;
  url: string;
  created: string;
  publishFrom?: string;
  publishTo?: string;
};

type Home = Page & {
  banner: Media;
  bannerText: string;
  aboutUsLeftText: string;
  aboutUsRightText: string;
  sections: HomeSection[];
  references: Reference[];
  cafes: Cafe[];
};

type HomeSection = Page & {
  heading: string;
  text: string;
  linkText: string;
  link: Page[];
};

type Reference = Page & {
  name: string;
  description: string;
  text: string;
  image: Attachment;
};

type Cafe = Page & {
  cafeName: string;
  image: Attachment;
};

type Contact = Page & {
  socials: Social[];
  countryState: CountryState;
  name: string;
  phone: string;
  email: string;
  zip: string;
  street: string;
  city: string;
};

type Social = Page & {
  linkTitle: string;
  linkUrl: string;
  icon: Attachment;
};

export type Article = Page & {
  title: string;
  summary: string;
  text: string;
  teaser: Attachment;
  relatedArticles: Article[];
};

type Media = {
  url: string;
};

type Attachment = {
  name: string;
  isImage: boolean;
  url: string;
};

type CountryState = {
  country: Country;
  state: State;
};

type Country = {
  twoLetterCode: string;
  name: string;
};

type State = {
  code: string;
  name: string;
};

export type XperienceQuery = {
  xperience: {
    site: {
      name: string;
      home: Home;
      article: Article;
      articles: Page & { articles: Article[] };
      contact: Contact;
      menu: Page[];
    };
  };
};
