import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardBlocks from "../components/DashboardBlocks";
import EmptyState from "../components/EmptyState";
import InvoiceGraph from "../components/InvoiceGraph";
import RecentInvoices from "../components/RecentInvoices";
import prisma from "../utils/db";
import { requiredUser } from "../utils/hooks";

const getInvoice = async (userId: string) => {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });

  return data;
};

const DashboardRoute = async () => {
  const session = await requiredUser();
  const data = await getInvoice(session.user?.id as string);
  return (
    <>
      {data.length < 1 ? (
        <EmptyState
          title="No invoices found"
          description="Create an invoice to see it right here"
          buttontext="Create Invoice"
          href="/dashboard/invoices/create"
        />
      ) : (
        <Suspense fallback={<Skeleton className="w-full h-full flex-1" />}>
          <DashboardBlocks />
          <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
            <InvoiceGraph />
            <RecentInvoices />
          </div>
        </Suspense>
      )}
    </>
  );
};

export default DashboardRoute;
