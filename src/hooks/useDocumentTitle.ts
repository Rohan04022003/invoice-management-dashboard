import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const routeTitles: { [key: string]: string } = {
  "/": "Dashboard",
  "/clients": "Clients",
  "/invoices": "Invoices",
  "/notifications": "Notifications",
  "/settings": "Settings",
};

export const useDocumentTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const title = routeTitles[location.pathname] || "Invoice App";
    document.title = `Invoice App - ${title}`;
  }, [location.pathname]);
};
