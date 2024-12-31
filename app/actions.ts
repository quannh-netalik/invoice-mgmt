"use server";

import { requiredUser } from "./utils/hooks";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema, onboardingSchema } from "./utils/zodSchema";
import prisma from "./utils/db";
import { redirect } from "next/navigation";
import { emailClient } from "./utils/mailstrap";
import { formatCurrency, formatDate } from "./utils/format";

export const onboardUser = async (
  _previousState: unknown,
  formData: FormData
) => {
  const session = await requiredUser();

  const submission = parseWithZod(formData, {
    schema: onboardingSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      address: submission.value.address,
    },
  });

  return redirect("/dashboard");
};

export const createInvoice = async (
  _previousState: unknown,
  formData: FormData
) => {
  const session = await requiredUser();

  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.invoice.create({
    data: {
      clientName: submission.value.clientName,
      clientEmail: submission.value.clientEmail,
      clientAddress: submission.value.clientAddress,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromName: submission.value.fromName,
      fromEmail: submission.value.fromEmail,
      fromAddress: submission.value.fromAddress,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      status: submission.value.status,
      total: submission.value.total,
      note: submission.value.note,
      userId: session.user?.id,
    },
  });

  emailClient.send({
    from: {
      email: "hello@demomailtrap.com",
      name: "Invoice Mgmt",
    },
    to: [
      {
        email: "quannh.netalik@gmail.com",
      },
    ],
    template_uuid: "38a58274-f66a-4232-b4d2-2d5ea2aac4e3",
    template_variables: {
      clientName: submission.value.clientName,
      invoiceNumber: submission.value.invoiceName,
      dueDate: formatDate(new Date(submission.value.date)),
      total: formatCurrency(submission.value.total, submission.value.currency),
      invoiceLink: "Test_InvoiceLink",
    },
  });

  return redirect("/dashboard/invoices");
};
