import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import InvoiceList from "@/components/Skeletons/InvoiceList";
import { useInvoices } from "@/context/invoice-provider";
import type { ClientSummary } from "@/types/type";


const Clients = () => {
  const { invoices, loading } = useInvoices();

  const clientMap = new Map<string, ClientSummary>();

  invoices.forEach((invoice) => {
    const key = invoice.email;
    const amount = Number(invoice.amount.replace(/[^0-9.-]+/g, ""));

    if (!clientMap.has(key)) {
      clientMap.set(key, {
        name: invoice.client,
        email: invoice.email,
        phone: invoice.phone,
        address: invoice.address,
        invoiceCount: 1,
        totalBilled: amount,
      });
    } else {
      const existing = clientMap.get(key)!;
      existing.invoiceCount += 1;
      existing.totalBilled += amount;
    }
  });

  const clients = Array.from(clientMap.values());

  if (loading) {
    return (
      <div className="p-4">
        <InvoiceList />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 w-full">
      <h1 className="text-2xl font-bold">Clients</h1>

      <div className="rounded-md border bg-white dark:bg-zinc-900">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead className="hidden lg:table-cell">Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Invoices</TableHead>
              <TableHead className="text-right">Total Billed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client, index) => (
              <TableRow key={index}>
                <TableCell>{client.name}</TableCell>
                <TableCell className="lg:block hidden">{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.invoiceCount}</TableCell>
                <TableCell className="text-right">
                  ${client.totalBilled.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {clients.length === 0 && (
          <div className="p-4 text-center text-muted-foreground">
            No clients found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Clients;
