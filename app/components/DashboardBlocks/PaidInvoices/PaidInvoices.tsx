import { FC } from "react";
import { CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IPaidInvoicesProps {
  total: number;
}

const PaidInvoices: FC<IPaidInvoicesProps> = ({ total }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
      <CreditCard className="size-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <h2 className="text-2xl font-bold">+{total}</h2>
      <p className="text-xs text-muted-foreground">
        Total Invoices which have been paid!
      </p>
    </CardContent>
  </Card>
);
export default PaidInvoices;
