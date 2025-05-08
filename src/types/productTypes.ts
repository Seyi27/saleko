export type PaginationApiType = {
    per_page: number;
    page: number;
    type?: string
}

export type NamePaginationApiType = {
    per_page: number;
    page: number;
    name?: string | null
}

export type CategoryPaginationApiType = {
    per_page: number;
    page: number;
    categoryName?: string | null
}

export type BestSellerSectionProps = {
    name: string;
    data?: Product[];
    sectionLoader?: boolean;
}

export type BestSellerProp = {
    item: Product;
}

// export type BestSeller = {
//     id: number,
//     name: string;
//     rating: number;
//     description: string;
//     price: string;
//     image: string;
//     former_price: string,
//     targetDate: string
// }

// export type ProductImage = {
//     small_image_url: string;
//     medium_image_url: string;
//     large_image_url: string;
//     original_image_url: string;
// };

// export type Product = {
//     id: number;
//     sku: string;
//     productNumber: string | null;
//     name: string;
//     description: string;
//     urlKey: string;
//     status: boolean;
//     thumbnail: string | null;
//     price: number;
//     cost: number | null;
//     specialPrice: number;
//     specialPriceFrom: string | null;
//     specialPriceTo: string | null;
//     weight: number;
//     color: number;
//     colorLabel: string | null;
//     size: number;
//     sizeLabel: string | null;
//     createdAt: string; // ISO date string
//     locale: string;
//     channel: string;
//     productId: number;
//     updatedAt: string; // ISO date string
//     parentId: number | null;
//     visibleIndividually: boolean;
//     minPrice: number | null;
//     maxPrice: number | null;
//     shortDescription: string;
//     metaTitle: string | null;
//     metaKeywords: string | null;
//     metaDescription: string | null;
//     width: number;
//     height: number;
//     depth: number;
//     rejectReason: string | null;
//     approvalStatus: string;
//     variants: any | null; // Could be more specific if variants have a known structure
//     productImages: ProductImage[] | null;
// };

export type Product = {
    sku: string;
    product_number: string | null;
    name: string;
    product_id: number;
    brand_name: string;
    category_name: string;
    category_type: string | null;
    qty: number;
    description: string;
    url_key: string;
    new: number; // Consider renaming to `isNew` in your app logic
    featured: number; // Consider renaming to `isFeatured`
    status: number;
    thumbnail: string | null;
    price: string; // You can change to number if it's always a number
    special_price: string;
    special_price_from: string | null;
    special_price_to: string | null;
    percentage_discount: number | null;
    promo_count_down: boolean;
    weight: string;
    color: number;
    color_label: string | null;
    size: number;
    size_label: string | null;
    created_at: string;
    updated_at: string;
    image_urls: ProductImage[];
    variants: ProductVariant[]; // If you know the structure of `variants`, replace `any` with an appropriate type
    seller: {
        merchant_id: string;
        marketplace_seller_id: number;
        shop_title: string;
        banner: string;
        logo: string;
        address1?: string | null;
        address2?: string | null;
        phone: string | null;
        state: string;
        city: string;
        country: string | null;
        twitter: string | null;
        facebook: string | null;
        youtube: string | null;
        instagram: string | null;
        skype: string | null;
        linked_in: string | null;
        market_info?: {
            id: number;
            name: string;
            image: string;
        };
    }
}

export type ProductImageProp = {
    images: ProductImage[];
}

export type ProductImage = {
    local_url: string;
    azure_url: string | null;
}

export type ProductVariant = {
    id: number;
    sku: string;
    name: string;
    price: string;
    special_price: string | null;
    special_price_from: string | null;
    special_price_to: string | null;
    color: string;
    size: string;
    qty: number;
}
