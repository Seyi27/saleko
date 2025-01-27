import { Dispatch, SetStateAction } from "react";

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
    placeholder?: string
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
    name: string;
    data: Product[];
    type: 'home' | 'related';
    visibleRows?: number;
    setVisibleRows?: Dispatch<SetStateAction<number>>;
    setRowData?: Dispatch<SetStateAction<Product[][]>>;
    viewAll?: boolean
}

export type ProductCardProp = {
    name?: string
    item: Product;
}

export type Product = {
    id: number;
    name: string;
    description: string;
    price: string;
    former_price?: string;
    image: string[];
    category: string;
    subCategory: string[];
    sizes: string[];
    date: string;
    rating: number;
    bestseller: boolean;
}

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

export type StoreSectionProps = {
    name: string;
    data: Store[];
}

export type StoreCardProp = {
    item: Store;
}

export type Store = {
    name: string,
    orders: string
}

export type CategoryData = {
    id: number;
    name: string;
    subcategories?: CategoryDataSubcategories[]
}

export type CategoryDataSubcategories = {
    image: string;
    name: string
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