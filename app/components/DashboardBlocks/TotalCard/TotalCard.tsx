"use client";
import { FC, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { formatCurrency } from "@/app/utils/format";
import { Toggle } from "@/components/ui/toggle";
import { InvoiceStatus } from "@prisma/client";

interface ITotalCard {
  data: {
    status: InvoiceStatus;
    total: number;
  }[];
}

const TotalCard: FC<ITotalCard> = ({ data }) => {
  const [isActualTotal, setIsActualTotal] = useState<boolean>(false);

  const total = useMemo(() => {
    let _data = data;

    // `isActual` will filter paid invoices only
    if (isActualTotal) {
      _data = _data.filter(({ status }) => status === InvoiceStatus.PAID);
    }

    return _data.reduce((acc, invoice) => acc + invoice.total, 0);
  }, [data, isActualTotal]);

  const unpaidTotal = useMemo(() => {
    return data
      .filter(({ status }) => status === InvoiceStatus.PENDING)
      .reduce((acc, invoice) => acc + invoice.total, 0);
  }, [data]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <DollarSign className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold flex flex-col">
            {formatCurrency(total, "USD")}
          </h2>
          <Toggle
            className="border border-[]"
            pressed={isActualTotal}
            onPressedChange={() => setIsActualTotal((pressed) => !pressed)}
          >
            Received
          </Toggle>
        </div>
        <p className="text-xs text-muted-foreground">Based on total volume {isActualTotal && `(unpaid: $${unpaidTotal})`}</p>
      </CardContent>
    </Card>
  );
};

export default TotalCard;
