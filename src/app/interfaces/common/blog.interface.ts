export interface Blog {
  _id?: string;
  name?: string;
  image?: string;
  slug?: string;
  bannerImage?: string;
  userImage?: string;
  userName?: string;
  userDesignation?: string;
  shortDescription?: string;
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
  keyWord?: string;
  url?: string;
  priority?: string;
  isHtml?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
  readOnly?: boolean;
}
