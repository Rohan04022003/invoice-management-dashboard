import { useParams } from "react-router-dom";
import { invoiceData } from "../lib/invoiceData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "paid":
      return <CheckCircle className="w-4 h-4 text-green-600 inline-block mr-1" />;
    case "pending":
      return <Clock className="w-4 h-4 text-yellow-500 inline-block mr-1" />;
    case "overdue":
      return <AlertCircle className="w-4 h-4 text-red-600 inline-block mr-1" />;
    default:
      return null;
  }
};

const ClientDetails = () => {
  const { email } = useParams();
  const clientInvoices = invoiceData.filter((inv) => inv.email === email);

  if (clientInvoices.length === 0) {
    return (
      <div className="p-6 text-center text-red-500">
        Client not found or has no invoices.
      </div>
    );
  }

  const client = clientInvoices[0];
  const totalBilled = clientInvoices.reduce((acc, curr) => {
    const amount = Number(curr.amount.replace(/[^0-9.-]+/g, ""));
    return acc + amount;
  }, 0);

  return (
    <div className="lg:p-6 p-4 space-y-6 w-full">
      <h1 className="text-2xl font-bold">Client Details</h1>

      <div className="rounded-md border p-4 bg-white dark:bg-zinc-900 space-y-2">
        <p><strong>Name:</strong> {client.client}</p>
        <p><strong>Email:</strong> {client.email}</p>
        <p><strong>Phone:</strong> {client.phone}</p>
        <p><strong>Address:</strong> {client.address}</p>
        <p><strong>Total Invoices:</strong> {clientInvoices.length}</p>
        <p><strong>Total Billed:</strong> ${totalBilled.toLocaleString()}</p>
      </div>

      <div className="rounded-md border bg-white dark:bg-zinc-900">
        <h2 className="text-xl font-semibold px-4 py-3 border-b">Invoices</h2>
        <Accordion type="single" collapsible className="w-full">
          {clientInvoices.map((inv) => (
            <AccordionItem value={inv.id} key={inv.id}>
              <AccordionTrigger className="px-4 py-3 hover:bg-muted/50">
                <div className="flex justify-between w-full items-center">
                  <span>
                    <span className="font-medium">{inv.id}</span> - {getStatusIcon(inv.status)}
                    <span className="capitalize">{inv.status}</span>
                  </span>
                  <span className="text-sm text-muted-foreground">{inv.date}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="text-sm space-y-2">
                  <p><strong>Amount:</strong> {inv.amount}</p>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inv.items.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{item.description}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>${item.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default ClientDetails;
