import type { Invoice } from "./invoiceDataType";

export type ClientSummary = {
    name: string;
    email: string;
    phone: string;
    address: string;
    invoiceCount: number;
    totalBilled: number;
};

export type invoicesDetailsTypes = {
    icon: React.ReactNode;
    quantity: number;
    label: string;
}

export interface InvoiceContextType {
    invoices: Invoice[];
    loading: boolean;
}

export type NavLinkType = {
    path: string;
    label: string;
    icon: React.ReactNode;
};

export type SidebarProps = {
    openNav: boolean;
    setOpenNav: React.Dispatch<React.SetStateAction<boolean>>;
};