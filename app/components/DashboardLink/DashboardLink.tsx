"use client";

import { cn } from "@/lib/utils";
import { HomeIcon, Users2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { DashboardLink } from "./DashboardLink.interface";

export const dashboardLinks: DashboardLink[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    Icon: HomeIcon,
  },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
    Icon: Users2,
  },
];

const DashboardLinks: FC = () => {
  const pathname = usePathname();
  return (
    <>
      {dashboardLinks.map((link) => (
        <Link
          className={cn(
            pathname === link.href
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground",
            "flex items-center gap-3 round-lg px-3 py-2 transition-all hover:text-primary"
          )}
          href={link.href}
          key={link.href}
        >
          <link.Icon className="size-4" />
          {link.name}
        </Link>
      ))}
    </>
  );
};

export default DashboardLinks;
