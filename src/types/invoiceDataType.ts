export type InvoiceItem = {
  description: string;
  quantity: number;
  price: number;
};

export type Invoice = {
  id: string;
  client: string;
  email: string;
  phone: string;
  address: string;
  items: InvoiceItem[];
  amount: string;
  status: "Paid" | "Pending" | "Overdue";
  date: string;
};
