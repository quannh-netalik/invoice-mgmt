import { FC } from "react";
import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IIssuedInvoicesProps {
  total: number;
}
const IssuedInvoices: FC<IIssuedInvoicesProps> = ({ total }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        Total Invoices Issued
      </CardTitle>
      <Users className="size-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <h2 className="text-2xl font-bold">+{total}</h2>
      <p className="text-xs text-muted-foreground">Total Invoices Issued!</p>
    </CardContent>
  </Card>
);

export default IssuedInvoices;
