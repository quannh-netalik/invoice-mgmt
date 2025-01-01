import { Badge } from "@/components/ui/badge";
import { InvoiceStatus } from "@prisma/client";
import { FC, useMemo } from "react";

interface IPaymentBadgeProps {
  status: InvoiceStatus;
  msg?: string;
}

const mappingBgColor: Record<InvoiceStatus, string> = {
  PAID: "#6bcd5ea3",
  PENDING: "#f6ed3da2",
};

const PaymentBadge: FC<IPaymentBadgeProps> = ({ status, msg }) => {
  const backgroundColor = useMemo(() => mappingBgColor[status], [status]);

  return (
    <Badge style={{ backgroundColor, color: "#000" }}>{msg || status}</Badge>
  );
};

export default PaymentBadge;
