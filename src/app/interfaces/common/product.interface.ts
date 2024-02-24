import { Brand } from './brand.interface';
import {Tag} from './tag.interface';
import {Variation, VariationOption} from './variation.interface';
import {Category} from './category.interface';
import {SubCategory} from './sub-category.interface';
import {Author} from './author.interface';
import {Publisher} from './publisher.interface';
import {Type} from "./type.interface";
import {IntimateHair} from "./intimateHair.interface";
import {HairColor} from "./hairColor.interface";
import {Orientation} from "./orientation.interface";
import {Region} from "./region.interface";
import {Area} from "./area.interface";
import {Zone} from "./zone.interface";
import { BodyType } from './bodyType.interface';
import { User } from './user.interface';

export interface Product {
  // publisher: any;
  _id?: string;
  name: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  verified?: boolean;
  title?: string;
  age?: string;
  height?: string;
  weight?: string;
  acceptsPeople?: string;
  runningOut?: string;
  size?: string;
  openingHours?: string[];
  zipCode?: string;
  address?: string;
  phone?: string;
  specialHours?: string;
  whatsApp?: string;
  email?: string;
  homePage?: string;
  featureTitle?: string;
  costPrice?: number;
  salePrice: number;
  hasTax?: boolean;
  tax?: number;
  bodyType?:BodyType;
  sku: string;
  user?: User;
  emiMonth?: number[];
  discountType?: number;
  discountAmount?: number;
  images?: string[];
  trackQuantity?: boolean;
  quantity?: number;
  category?: Category;
  subCategory?: SubCategory;
  author?: Author;
  brand?: Brand;
  publisher?: Publisher;
  type?: Type;
  intimateHair?: IntimateHair;
  hairColor?: HairColor;
  orientation: Orientation;
  region?: Region;
  tags?: string[] | Tag[];
  specifications?: ProductSpecification[];
  features?: ProductFeature[];
  hasVariations?: boolean;
  variations?: Variation[];
  variationsOptions?: VariationOption[];
  status?: string;
  isFeatured?: boolean;
  videoUrl?: string;
  threeMonth?: number;
  sixMonth?: number;
  twelveMonth?: number;
  unit?: string;
  pricing?: pricingData[];
  // Seo
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  // Point
  earnPoint?: boolean;
  pointType?: number;
  pointValue?: number;
  redeemPoint?: boolean;
  redeemType?: number;
  redeemValue?: number;
  division?: any;
  area?: any;
  zone?: any;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
  selectedQty?: number;
  // For Create Order
  orderVariationOption?: VariationOption;
  orderVariation?: string;
  mondayHours?: {startHour?: string, endHour?: string}[];
  tuesdayHours?: {startHour?: string, endHour?: string}[];
  wednesdayHours?: {startHour?: string, endHour?: string}[];
  thursdayHours?: {startHour?: string, endHour?: string}[];
  fridayHours?: {startHour?: string, endHour?: string}[];
  saturdayHours?: {startHour?: string, endHour?: string}[];
  // For Offer
  offerDiscountAmount?: number;
  offerDiscountType?: number;
  resetDiscount?: boolean;
  dayHours?: {day?: string, startHour?: string, endHour?: string}[];
}
export interface pricingData {
  _id?: string;
  serviceDescription?: string;
  timing?: string;
  priceValue?: string;
}
interface CatalogInfo {
  _id: string;
  name: string;
  slug: string;
}

export interface ProductSpecification {
  name?: string;
  value?: string;
  type?: string;
}

export interface ProductFeature {
  name?: string;
  value?: string;
}
