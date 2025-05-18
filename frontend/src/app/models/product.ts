export interface Product {
  id: string;
  name: string;
  description?: string;
  image?: string;
  priceInAcceptedShares: number;
  priceUSD: number;
  shippingRequired: boolean;
  isActive: boolean;
}

export class CreateProductRequest {
  name!: string;
  description?: string;
  image?: string;
  priceInAcceptedShares!: number;
  shippingRequired!: boolean;
}
