export interface Product {
  id: number;
  title: string;
  slug: string;
  quantity: number;
  price: number;
  status?: string;
  description: string;
  properties: string;
  photos: any;
  created_at: Date;
  updated_at: Date;
}

export interface ProductPhoto {
  id: number;
  url: string;
  product: number;
}
