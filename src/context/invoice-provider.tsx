import React, { createContext, useContext, useEffect, useState } from "react";
import type { Invoice } from "@/types/invoiceDataType";
import type { InvoiceContextType } from "@/types/type";

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const InvoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

useEffect(() => {
  setLoading(true);
  fetch("/db.json")
    .then((res) => res.json())
    .then((data) => {
      setInvoices(data.invoices);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Failed to load invoices:", err);
      setLoading(false);
    });
}, []);

  return (
    <InvoiceContext.Provider value={{ invoices, loading }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoices = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error("useInvoices must be used within an InvoiceProvider");
  }
  return context;
};
