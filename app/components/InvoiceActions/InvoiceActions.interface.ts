import { LucideProps } from "lucide-react";
import {
  ForwardRefExoticComponent,
  HTMLAttributeAnchorTarget,
  RefAttributes,
} from "react";

type ActionIcon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

export interface IActionItem {
  href?: string;
  Icon: ActionIcon;
  text: string;
  disabled?: boolean;
  target?: HTMLAttributeAnchorTarget;
  onClick?: () => void;
}
