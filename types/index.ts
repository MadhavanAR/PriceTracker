export type PriceHistoryItem = {
  price: number;
};

export type User = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type Product = {
  _id?: string;
  url: string;
  currency: string;
  image: string;
  title: string;
  currentPrice: number;
  originalPrice: number;
  priceHistory: PriceHistoryItem[] | [];
  highestPrice: number;
  lowestPrice: number;
  averagePrice: number;
  discountRate: number;
  description: string;
  category: string;
  reviewsCount: number;
  stars: number;
  isOutOfStock: Boolean;
  users?: User[];
};

export type NotificationType =
  | "WELCOME"
  | "CHANGE_OF_STOCK"
  | "LOWEST_PRICE"
  | "THRESHOLD_MET";

export type EmailContent = {
  subject: string;
  body: string;
};

export type EmailProductInfo = {
  title: string;
  url: string;
};

export type RegistrationData = {
  id?: string | undefined;
  username: string;
  email: string;
  password: string;
  checkPassword?: any;
};

export type LoginData = {
  id?: string;
  email: string;
  password: string;
  checkPassword?: any;
};
