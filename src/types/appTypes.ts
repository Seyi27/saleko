/************* add to cart ***************** */

export type AddToCartType = {
    products: Product[];
};

export type UpdateCartType = {
    cart_id: number | undefined;
    product_id: number | undefined;
    quantity: number
};

export type DeleteCartType = {
    cart_id: number | undefined;
    product_id: number | undefined;
    cart_item_id: number | undefined;
};

type Product = {
    sku?: string;
    quantity?: number;
};

export type CheckoutType = {
    cart_id?: number;
};

/************* guest cart ***************** */

export type GetGuestCartType = {
    guest_id: string
}

export type AddToGuestCartType = {
    products: Product[];
    guest_token: string
};

export type UpdateGuestCartType = {
    guest_token: string,
    sku: string,
    quantity: number
};

export type DeleteGuestCartType = {
    guest_token: string;
    sku: string;
};

/************* wishlist ***************** */

export type CreateWishlistType = {
    product_id?: number;
};

export type DeleteWishlistType = {
    product_id?: number;
};

/************ banner ******************* */

export type SliderItem = {
    id: number;
    type: string;
    is_active: boolean;
    display_from: string;
    display_to: string;
    created_at: string;
    updated_at: string;
    image_url: string;
};

/********** pick up location ********* */

export type PickupLocationType = {
    address1: string;
    city: string;
    state: string;
};

/*********** customer address *********** */

export type CustomerAddressApiType = {
    customer_id: number | undefined
}

export type CustomerAddressDataType = {
    address_id: number;
    address_title: string;
    address: string;
    city: string;
    state: string;
    default_address: boolean;
}

export type AddCustomerAddressDataType = {
    customer_id: number | undefined;
    first_name: string;
    last_name: string;
    phone: string;
    company_name: string;
    building_no: string;
    street_address: string;
    address_title: string;
    city: string;
    state: string;
    default_address: number; // or boolean if your app treats 1/0 as true/false
    note: string;
};

export type DeliveryAddressItemProp = {
    index: number;
    item: CustomerAddressDataType;
};