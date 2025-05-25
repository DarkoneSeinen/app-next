export interface Headphone {
  id: string;
  name: string;
  price: number;
  durationMonths: number;
  purchaseDate: string;
}

export interface HeadphoneFormData {
  name: string;
  price: number;
  durationMonths: number;
}
