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
    onClick?: React.MouseEventHandler<HTMLButtonElement>; // Type for onClick
    disabled?: boolean
}

export type CustomModalProps = {
    isOpen?: boolean,
    closeModal: () => void,
    label?: string;
    onclick?: () => void
}

export type AuthNavHeaderProps = {
    noLogoDisplay?: boolean;
    auth?: string
}

export type CustomTextInputProps = {
    type: string,
    name: string,
    value: string,
    label: string,
    errorMessage?: string,
    idAndHtmlFor: string,
    handleTextInput: (key: string, e: string) => void,
    handleDropdown?: () => void
}

// export type NegotiableSectionProps = {
//     name: string;
//     data: Negotiable[];
// }

// export type NegotiableProp = {
//     item: Negotiable;
// }

// export type Negotiable = {
//     name: string;
//     rating: number;
//     description: string;
//     price: string;
//     image: string;
// }

export type ProductSectionProps = {
    name: string;
    data: Product[];
    type: string;
    visibleRows?: number;
    setVisibleRows?: Dispatch<SetStateAction<number>>;
    setRowData?: Dispatch<SetStateAction<Product[][]>>;
}

export type ProductCardProp = {
    name?: string
    item: Product;
}

export type Product = {
    id:number;
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