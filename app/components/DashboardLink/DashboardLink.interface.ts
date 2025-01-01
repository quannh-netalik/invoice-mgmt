import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type DashboardLinkIcon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

export interface DashboardLink {
  name: string;
  href: string;
  Icon: DashboardLinkIcon;
}
