import { Dispatch, SetStateAction } from "react";
import { Product } from "./productTypes";

export type CustomButtonProps = {
    width?: string;
    height?: string;
    textColor?: string;
    bgColor?: string;
    label: string;
    icon?: React.ReactNode;
    fontSize?: number,
    fontWeight?: number,
    borderColor?: string,
    borderWidth?: string,
    borderRadius?: string,
    loader?: boolean,
    loaderColor?: boolean,
    onClick?: React.MouseEventHandler<HTMLButtonElement>; // Type for onClick
    disabled?: boolean
}

export type CustomModalProps = {
    isOpen?: boolean,
    closeModal: () => void,
    label?: 'signup' | 'login' | 'password_reset' | 'order_confirmed' | 'confirm_negotiation_modal';
    item?: Product,
    quantity?: string,
    onclick?: () => void
}

export type AuthNavHeaderProps = {
    noLogoDisplay?: boolean;
    auth?: string
}

export type CustomTextInputProps = {
    type: 'normal' | 'phoneNo' | 'password' | 'dropdown',
    name: string,
    value: string,
    label: string,
    errorMessage?: string,
    idAndHtmlFor: string,
    handleTextInput: (key: string, e: string) => void,
    handleDropdown?: () => void,
    noPasswordChecklist?: boolean,
    selectedCode?: string,
    setSelectedCode?: Dispatch<SetStateAction<string>>
    placeholder?: string,
    focused?: boolean
    setFocused?: Dispatch<SetStateAction<boolean>>
}

export type CloseModalContainerProps = {
    cancelIconOnly?: boolean,
    handleCloseModal: () => void,
    handleAuthNavigate?: (screen: string) => void
}

export type AuthModalProps = {
    isOpen: boolean,
    handleCloseModal: () => void,
    handleOpenSignupModal?: () => void,
    handleOpenLoginModal?: () => void,
    handleOpenResetPasswordModal?: () => void
}

export type AuthModalScreenProps = {
    handleCloseModal: () => void,
    handleAuthNavigate: (screen: string) => void
    handleOpenSignupModal?: () => void,
    handleOpenLoginModal?: () => void,
    handleOpenResetPasswordModal?: () => void,
}

export type ProductSectionProps = {
    name?: string;
    data: Product[] | undefined;
    type: 'home' | 'related' | 'search';
    visibleRows?: number;
    setVisibleRows?: Dispatch<SetStateAction<number>>;
    setRowData?: Dispatch<SetStateAction<Product[] | undefined>>;
    viewAll?: string | boolean;
    nameContainer?: boolean
    sectionLoader?: boolean
}

export type ProductCardProp = {
    name?: string
    item: Product;
}

// export type Product = {
//     id: number;
//     name: string;
//     description: string;
//     price: string;
//     former_price?: string;
//     image: string[];
//     category: string;
//     subCategory: string[];
//     sizes: string[];
//     date: string;
//     rating: number;
//     bestseller: boolean;
// }

// export type BestSellerSectionProps = {
//     name: string;
//     data: BestSeller[];
// }

// export type BestSellerProp = {
//     item: BestSeller;
// }

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

export type TopStoreSectionProps = {
    name: string;
    data?: StoreType[];
    sectionLoader?: boolean,
}

export type StoreType = {
    id: number;
    merchant_id: string;
    url: string;
    is_approved: number;
    is_disabled: number;
    shop_title: string;
    description: string | null;
    banner: string | null;
    logo: string | null;
    tax_vat: string | null;
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
    address1: string | null;
    address2: string | null;
    phone: string | null;
    state: string;
    city: string;
    country: string | null;
    drop_off: string;
    representative_id: number | null;
    postcode: string | null;
    return_policy: string | null;
    shipping_policy: string | null;
    privacy_policy: string | null;
    twitter: string | null;
    facebook: string | null;
    youtube: string | null;
    instagram: string | null;
    skype: string | null;
    linked_in: string | null;
    pinterest: string | null;
    customer_id: number;
    created_at: string;
    updated_at: string;
    commission_enable: number;
    commission_percentage: string;
    min_order_amount: string;
    google_analytics_id: string | null;
    business_address: string;
    commodities: number;
    market: string;
    bvn: string;
    home_address: string;
    business_name: string;
    identity_document_number: string;
    bankName: string | null;
    accountNumber: string | null;
    account_created_at: string | null;
    identity_document_number_type: number;
    is_mro_assigned: number;
    orders_count: number;
    logo_image_url: string;
    banner_image_url: string;
    market_info: MarketInfo;
}

export type MarketInfo = {
    id: number;
    name: string;
    image: string;
    image_url: string;
}

export type TopStoreCardProp = {
    item: StoreType;
}

/*************** Market Place data ******************* */

export type MarketplaceDataProps = {
    id: number;
    name: string;
    image: string;
}

/************ Negotiation Modal Prop ***************** */

export type NegotiationModalProp = {
    isOpen: boolean
    closeModal: () => void
    item?: Product
}

/************ Transaction Pin Modal Prop ****************** */

export type TransactionPinModalProp = {
    isOpen: boolean,
    closeModal: () => void,
    setOrderConfirmedModal: Dispatch<SetStateAction<boolean>>,
}

/************ Categories Prop ****************** */

export type CategoryDataProp = {
    id: number;
    name: string;
    image: string;
    children: CategoryDataChildrenProp[]
};

export type CategoryDataChildrenProp = {
    id: number;
    name: string;
    image: string;
}

export type CategoryDataPropType = {
    data: CategoryDataProp
};

/************ Seller Card Prop ****************** */

export type StoreListCardItemProp = {
    item: StoreListCardProp;
}

export type StoreListCardProp = {
    id: number;
    store_name: string;
    store_market: string;
    category: string;
}

/************ Review Message Prop ****************** */

export type ReviewMessageItemProp = {
    item: ReviewMessageProp;
}

export type ReviewMessageProp = {
    title: string,
    rating: number,
    review: string,
    date: string,
    person: string,
}

/**************** Page Wrapper Prop **************** */

export type PageWrapperPropType = {
    classname: string;
    children: React.ReactNode;
    filterNav?: boolean
}

/******************************* */

export type MenuSidebarProps = {
    isOpen?: boolean,
    closeModal: () => void,
}