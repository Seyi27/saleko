export type FeaturedProductsApiType = {
    pageNumber: number;
    pageSize: number
}

export type ProductImage = {
    small_image_url: string;
    medium_image_url: string;
    large_image_url: string;
    original_image_url: string;
};

export type Product = {
    id: number;
    sku: string;
    productNumber: string | null;
    name: string;
    description: string;
    urlKey: string;
    status: boolean;
    thumbnail: string | null;
    price: number;
    cost: number | null;
    specialPrice: number;
    specialPriceFrom: string | null;
    specialPriceTo: string | null;
    weight: number;
    color: number;
    colorLabel: string | null;
    size: number;
    sizeLabel: string | null;
    createdAt: string; // ISO date string
    locale: string;
    channel: string;
    productId: number;
    updatedAt: string; // ISO date string
    parentId: number | null;
    visibleIndividually: boolean;
    minPrice: number | null;
    maxPrice: number | null;
    shortDescription: string;
    metaTitle: string | null;
    metaKeywords: string | null;
    metaDescription: string | null;
    width: number;
    height: number;
    depth: number;
    rejectReason: string | null;
    approvalStatus: string;
    variants: any | null; // Could be more specific if variants have a known structure
    productImages: ProductImage[] | null;
};
