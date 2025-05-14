export interface Product {
  productId: string;
  name: string;
  description?: string;
  image?: string;
  priceInAcceptedShares: number;
  priceUSD: number;
}
