import EditInvoice from "@/app/components/EditInvoice";
import prisma from "@/app/utils/db";
import { requiredUser } from "@/app/utils/hooks";
import { notFound } from "next/navigation";
import { FC } from "react";

const getInvoice = async (invoiceId: string, userId: string) => {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
};

interface IEditInvoiceRouteProps {
  params: Promise<{ invoiceId: string }>;
}

const EditInvoiceRoute: FC<IEditInvoiceRouteProps> = async ({ params }) => {
  const { invoiceId } = await params;
  const session = await requiredUser();
  const data = await getInvoice(invoiceId, session.user?.id as string);

  return <EditInvoice data={data} />;
};

export default EditInvoiceRoute;
