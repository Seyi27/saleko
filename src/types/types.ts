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
    viewAll?: boolean
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

export type BestSellerSectionProps = {
    name: string;
    data: BestSeller[];
}

export type BestSellerProp = {
    item: BestSeller;
}

export type BestSeller = {
    id: number,
    name: string;
    rating: number;
    description: string;
    price: string;
    image: string;
    former_price: string,
    targetDate: string
}

export type TopStoreSectionProps = {
    name: string;
    data: {
        name: string,
        orders: string
    }[];
}

export type TopStoreCardProp = {
    item: {
        name: string,
        orders: string
    };
}

/*************** Market Place data ******************* */

export type MarketplaceDataProps = {
    marketId: number;
    name: string;
    image: string;
    description: string;
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
    imageUrl: string;
    slug: string;
    position: number;
    parentId: number | null;
    status: boolean;
    children: CategoryDataProp[]; // Recursive type to represent nested categories
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