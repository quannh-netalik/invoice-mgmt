import { FC } from "react";
import { InvoiceStatus } from "@prisma/client";

import prisma from "../../utils/db";
import { requiredUser } from "../../utils/hooks";
import TotalCard from "./TotalCard";
import IssuedInvoices from "./IssuedInvoices";
import PaidInvoices from "./PaidInvoices";
import PendingInvoices from "./PendingInvoices/PendingInvoices";

async function getInvoiceList(userId: string) {
  const [data, openInvoices, paidInvoices] = await Promise.all([
    prisma.invoice.findMany({
      where: {
        userId: userId,
      },
      select: {
        status: true,
        total: true,
      },
    }),
    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: InvoiceStatus.PENDING,
      },
      select: {
        id: true,
      },
    }),
    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: InvoiceStatus.PAID,
      },
      select: {
        id: true,
      },
    }),
  ]);

  return {
    data,
    openInvoices,
    paidInvoices,
  };
}

const DashboardBlocks: FC = async () => {
  const session = await requiredUser();
  const { data, openInvoices, paidInvoices } = await getInvoiceList(
    session.user?.id as string
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
      <TotalCard data={data} />
      <IssuedInvoices total={data.length} />
      <PaidInvoices total={paidInvoices.length} />
      <PendingInvoices total={openInvoices.length} />
    </div>
  );
};

export default DashboardBlocks;
