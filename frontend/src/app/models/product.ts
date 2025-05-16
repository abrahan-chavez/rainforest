export interface Product {
  productId: string;
  name: string;
  description?: string;
  image?: string;
  priceInAcceptedShares: number;
  priceUSD: number;
}

export class CreateProductRequest {
  name!: string;
  description?: string;
  image?: string;
  priceInAcceptedShares!: number;
}
