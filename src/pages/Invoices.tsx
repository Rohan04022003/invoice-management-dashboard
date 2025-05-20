import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table";
import { Input } from "../components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { getBadgeColor } from "@/lib/getBadgeColor";
import { useInvoices } from "@/context/invoice-provider";
import InvoiceList from "@/components/Skeletons/InvoiceList";

const Invoices = () => {
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    const {invoices, loading} = useInvoices();

    const filteredData = invoices.filter((invoice) => {
        const matchesSearch =
            invoice.client.toLowerCase().includes(search.toLowerCase()) ||
            invoice.id.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = filterStatus
            ? invoice.status.toLowerCase() === filterStatus.toLowerCase()
            : true;
        return matchesSearch && matchesStatus;
    });

  if (loading) {
    return <div className="p-4"><InvoiceList /></div>
  }

    return (
        <div className="p-6 w-full space-y-6 bg-background">
            <div className="flex flex-col lg:flex-row md:items-center lg:justify-between gap-4 w-full">
                <h1 className="text-2xl font-bold">All Invoices</h1>

                <div className="flex lg:justify-center justify-between gap-2 w-full lg:w-auto">
                    <Input
                        type="text"
                        placeholder="Search invoice or client..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-64"
                    />

                    <Select
                        value={filterStatus}
                        onValueChange={(value) =>
                            setFilterStatus(value === filterStatus ? "" : value)
                        }
                    >
                        <SelectTrigger className="lg:w-48 w-28">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Paid">Paid</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Overdue">Overdue</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={() => { setSearch(""); setFilterStatus("") }} variant={"outline"} className={`text-gray-500 cursor-pointer ${search || filterStatus ? 'block' : 'hidden'}`}><RefreshCcw /></Button>
                </div>
            </div>

            <div className="rounded-md border bg-white dark:bg-zinc-900">
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
                        {filteredData.map((invoice) => (
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
                                <TableHead className="hidden lg:table-cell">Email</TableHead>

                                <TableCell>{invoice.date}</TableCell>
                                <TableCell><p className={`${getBadgeColor(invoice.status)}`}>{invoice.status}</p></TableCell>
                                <TableCell className="text-right">{invoice.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {filteredData.length === 0 && (
                    <div className="p-4 text-center text-muted-foreground">
                        No invoices found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Invoices;
