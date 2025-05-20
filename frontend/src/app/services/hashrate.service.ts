import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class HashRateService extends BaseService {
  private httpClient = inject(HttpClient);

  private readonly hashPriceInternal = signal<number>(0);
  readonly hashPrice = this.hashPriceInternal.asReadonly();

  myHashRate = signal<number>(1);

  constructor() {
    super();
    this.getHashPrice();
  }

  private getHashPrice() {
    return this.httpClient
      .get<number>(`${this.baseUrl}/utilities/hashprice`)
      .subscribe({
        next: (response) => {
          this.hashPriceInternal.set(response);
        },
        error: (error) => {
          console.error('Error fetching hash price:', error);
        },
      });
  }

  public resolveHashTime(price: number) {
    if (this.hashPriceInternal() <= 0) {
      return Number.NaN;
    }
    const hashPrice = this.hashPriceInternal();
    const hashTime = (price / (hashPrice)) / this.myHashRate();
    return hashTime;
  }

  public resolveHashTimeFromHashes(hashes: number) {
    if (this.hashPriceInternal() <= 0) {
      return Number.NaN;
    }
    const hashTime = hashes / this.myHashRate();
    return hashTime;
  }
}
