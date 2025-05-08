export type CartItemProp = {
  item: CartItem;
};

export interface Seller {
  id: number;
  shop_title: string;
  description: string | null;
  business_name: string;
}

export interface ProductCategory {
  category_name: string;
  category_type: string;
}

export interface Product {
  id: number;
  sku: string;
  type: string;
  created_at: string;
  updated_at: string;
  product_category: ProductCategory;
  brand_name: string;
}

export interface CartItem { // unified cart for both guest cart and user cart
  id?: number;
  product_id: number;
  cart_id?: number;
  sku: string;
  type: string;
  name: string;
  quantity: number;
  price: string;
  total: string | number;
  created_at?: string;
  updated_at?: string;
  images: string[];
  seller: {
    id: number;
    shop_title: string;
    description: string | null;
    business_name: string;
  };
  category_name?: string;
  children?: any[];
  product?: {
    id: number;
    sku: string;
    type: string;
    created_at: string;
    updated_at: string;
    product_category: {
      category_name: string;
      category_type: string;
    };
    brand_name: string;
  };
  additional?: {
    product_id: string;
    quantity: string;
    seller_info: {
      product_id: string;
      seller_id: number;
      is_owner: number;
    };
  };
}

