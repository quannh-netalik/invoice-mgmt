"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InvoiceStatus } from "@prisma/client";
import {
  CheckCircle,
  DownloadCloudIcon,
  Mail,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { toast } from "sonner";
import { IActionItem } from "./InvoiceActions.interface";

interface IInvoiceActionsProps {
  id: string;
  status: string;
}

const InvoiceActions: FC<IInvoiceActionsProps> = ({ id, status }) => {
  const handleSendReminder = () => {
    toast.promise(
      fetch(`/api/email/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      {
        loading: "Sending reminder email...",
        success: "Reminder email sent successfully",
        error: "Failed to send reminder email",
      }
    );
  };

  const actionItems: IActionItem[] = [
    {
      href: `/dashboard/invoices/${id}`,
      Icon: Pencil,
      text: "Edit Invoice",
      disabled: status === InvoiceStatus.PAID,
    },
    {
      href: `/api/invoice/${id}`,
      Icon: DownloadCloudIcon,
      text: "Download Invoice",
      target: "_blank",
    },
    {
      onClick: handleSendReminder,
      Icon: Mail,
      text: "Reminder Email",
      disabled: status === InvoiceStatus.PAID,
    },
    {
      href: `/dashboard/invoices/${id}/delete`,
      Icon: Trash,
      text: "Delete Invoice",
      disabled: status === InvoiceStatus.PAID,
    },
    {
      href: `/dashboard/invoices/${id}/paid`,
      Icon: CheckCircle,
      text: "Mark as Paid",
      disabled: status === InvoiceStatus.PAID,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="secondary">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {actionItems.map((item) => (
          <DropdownMenuItem
            disabled={item.disabled}
            key={item.text}
            onClick={item.onClick}
            asChild={!item.onClick}
          >
            {item.href ? (
              <Link href={item.href} target={item.target}>
                <item.Icon className="size-4 mr-2" /> {item.text}
              </Link>
            ) : (
              <>
                <item.Icon className="size-4 mr-2" /> {item.text}
              </>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default InvoiceActions;
