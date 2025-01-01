import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

interface IPendingInvoices {
  total: number;
}

const PendingInvoices: FC<IPendingInvoices> = ({ total }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
      <Activity className="size-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <h2 className="text-2xl font-bold">+{total}</h2>
      <p className="text-xs text-muted-foreground">
        Invoices which are currently pending!
      </p>
    </CardContent>
  </Card>
);
export default PendingInvoices;
