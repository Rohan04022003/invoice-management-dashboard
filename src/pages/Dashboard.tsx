import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useState } from "react";
import type { Invoice } from "@/types/invoiceDataType";
import { AlertCircle, CheckCircle, Clock, DollarSign } from "lucide-react";
import { useEffect } from "react";
import { getBadgeColor } from "@/lib/getBadgeColor";
import { useInvoices } from "@/context/invoice-provider";
import DashboardSkeleton from "@/components/Skeletons/DashboardSkeleton"
import type { invoicesDetailsTypes } from "@/types/type";

const Dashboard = () => {

  const { invoices, loading } = useInvoices()

  const [data, setdata] = useState<Invoice[]>([])

  useEffect(() => {
    setdata(invoices.map((invoice) => ({
      ...invoice,
      status: invoice.status as "Paid" | "Pending" | "Overdue",
    })))
  }, [invoices])

  const [totalPaidInvoices, setTotalPaidInvoices] = useState(0);
  const [totalPendingInvoices, setTotalPendingInvoices] = useState(0);
  const [totalOverdueInvoices, setTotalOverdueInvoices] = useState(0);


  useEffect(() => {
    let paid = 0;
    let pending = 0;
    let overdue = 0;

    data.forEach((item) => {
      if (item.status === "Paid") paid++;
      else if (item.status === "Pending") pending++;
      else if (item.status === "Overdue") overdue++;
    });

    setTotalPaidInvoices(paid);
    setTotalPendingInvoices(pending);
    setTotalOverdueInvoices(overdue);
  }, [data]);


  const totalRevenue = data.reduce((acc, item) => {
    const numericAmount = Number(item.amount.replace(/[^0-9.-]+/g, ""));
    return acc + numericAmount;
  }, 0);

  const invoiceDetails: invoicesDetailsTypes[] = [
    {
      icon: <DollarSign color="gray" />,
      quantity: totalRevenue,
      label: "Total Revenue"
    },
    {
      icon: <CheckCircle color="green" />,
      quantity: totalPaidInvoices,
      label: "Paid Invoices"
    },
    {
      icon: <Clock color="orange" />,
      quantity: totalPendingInvoices,
      label: "Pending Invoices"
    },
    {
      icon: <AlertCircle color="red" />,
      quantity: totalOverdueInvoices,
      label: "Overdue Invoices"
    },
  ]

  if (loading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="bg-background p-4 w-full space-y-6">

      <div className="invoices-details grid lg:grid-cols-4 grid-cols-2 gap-3">
        {
          invoiceDetails.map((item, index) => {
            return (
              <div key={index} className="w-full p-4 dark:bg-muted/50 bg-muted/90 rounded-sm">
                <div className="p-3 w-fit rounded-sm dark:bg-zinc-800 bg-zinc-200">
                  {item.icon}
                </div>
                <p className="flex items-center pt-3 pb-2 text-3xl font-semibold"><DollarSign size={30} className={`${item.label === "Total Revenue" ? "block" : "hidden"}`} />{item.quantity}</p>
                <p className="text-lg">{item.label}</p>
              </div>
            )
          })
        }
      </div>

      <div className="recent-invoices">
        {/* Invoice Table */}
        <div className="rounded-md border bg-white dark:bg-zinc-900">
          <h2 className="text-xl py-5 font-semibold border-b px-2">Recent Invoices</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead className="hidden lg:table-cell">Email</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.slice(0, 15).map((invoice) => (
                <TableRow
                  key={invoice.id}
                  className="hover:bg-muted/50 transition cursor-pointer"
                >
                  <TableCell>
                    <Link to={`/clients/${invoice.email}`} className="underline">
                      {invoice.id}
                    </Link>
                  </TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell className="lg:block hidden">{invoice.email}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell><p className={`${getBadgeColor(invoice.status)}`}>{invoice.status}</p></TableCell>
                  <TableCell className="text-right">{invoice.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {data.length === 0 && (
            <div className="p-4 text-center text-muted-foreground">
              No invoices found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
