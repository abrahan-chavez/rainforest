export interface Order {
  id: string;
  productId: string;
  emailAddress: string;
  status: OrderStatus;
  stratumUrl: string;
  workerName: string;
  password: string;
  quotedAcceptedSharePrice: number;
  progress: number;
}

export enum OrderStatus {
  Created = 'Created',
  Mining = 'Mining',
  Completed = 'Completed',
  Shipped = 'Shipped',
}

export class CreateOrderRequest {
  productId!: string;
  emailAddress!: string;
  fullName!: string;
  streetAddress!: string;
  city!: string;
  state!: string;
  zipCode!: string;
  country!: string;
}
