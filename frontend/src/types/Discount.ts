export type Discount = {
  id: string;
  name: string;
  description?: string;
  percentage: number;
  code: string;
  startsAt: string;
  endsAt?: string;
  isActive: boolean;
};