export type BaseProduct = {
  $type: string;
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  productType: string;
  isActive: boolean;
};

export type SizeVariant = {
  maat: string;
  stock: number;
  sku: string;
};

export type ClothingColorVariant = {
  kleur: string;
  imageUrl: string;
  maten: SizeVariant[];
};

export type MugColorVariant = {
  kleur: string;
  imageUrl: string;
  stock: number;
  sku: string;
};

export type ClothingProduct = BaseProduct & {
  $type: "TShirt" | "Hoodie";
  kleuren: ClothingColorVariant[];
};

export type MugProduct = BaseProduct & {
  $type: "Mok";
  kleuren: MugColorVariant[];
};

export type Product = ClothingProduct | MugProduct;