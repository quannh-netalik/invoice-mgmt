import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import InvoiceList from "../../components/InvoiceList";

const InvoicesRoute: FC = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">Invoices</CardTitle>
            <CardDescription>Manage your invoices here </CardDescription>
          </div>

          <Link href="/dashboard/invoices/create" className={buttonVariants()}>
            <PlusIcon /> Create invoices
          </Link>
        </div>
      </CardHeader>

      <CardContent>
        <InvoiceList />
      </CardContent>
    </Card>
  );
};

export default InvoicesRoute;
