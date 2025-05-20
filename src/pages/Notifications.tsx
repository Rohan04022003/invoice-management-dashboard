import InvoiceList from "@/components/Skeletons/InvoiceList";
import { useInvoices } from "@/context/invoice-provider";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

// Icon helper
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

const Notifications = () => {
  const { invoices, loading } = useInvoices();

  if (loading) return <div className="md:p-6 p-4"><InvoiceList /></div>;

  const notifications = invoices.map((invoice) => ({
    id: invoice.id,
    message: `Invoice ${invoice.id} for ${invoice.client} is ${invoice.status.toLowerCase()}.`,
    status: invoice.status,
    date: invoice.date,
  }));

  return (
    <div className="md:p-6 p-4 w-full space-y-4">
      <h2 className="text-2xl font-semibold">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-muted-foreground">No notifications found.</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map(({ id, message, status, date }) => (
            <li
              key={id}
              className="p-4 rounded border flex justify-between items-center bg-background dark:bg-zinc-900"
            >
              <div className="flex items-center gap-2">
                {getStatusIcon(status)}
                <span className="text-sm">{message}</span>
              </div>
              <span className="text-xs text-muted-foreground text-nowrap ml-3">{date}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
