"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { FC } from "react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface DataGraph {
  date: string;
  amount: number;
}

interface IGraphProps {
  data: DataGraph[];
}

const Graph: FC<IGraphProps> = ({ data }) => {
  return (
    <ChartContainer
      config={{
        amount: {
          label: "Amount",
          color: "hsl(var(--primary))",
        },
      }}
      className="min-h-[100px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="var(--color-amount)"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default Graph;
