export interface Product {
  id: string;
  name: string;
  description?: string;
  image?: string;
  priceUSD: number;
  shippingRequired: boolean;
  isActive: boolean;
  stockQuantity: number;
}

export class CreateProductRequest {
  name!: string;
  description?: string;
  image?: string;
  priceUsd!: number;
  stockQuantity!: number;
  shippingRequired!: boolean;
}
