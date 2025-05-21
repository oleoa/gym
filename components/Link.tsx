"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MyLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={
        "hover:text-blue-400 " + cn(pathname === href && "text-blue-300")
      }
    >
      {children}
    </Link>
  );
}
