import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  active?: boolean;
}

export default function MobileLink({ href, children, icon, onClick, active }: Props) {
  return (
    <Link href={href}>
      <button
        onClick={onClick}
        className={cn(
          "group flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg transition-all",
          "hover:bg-primary/10 active:bg-primary/20 border border-transparent hover:border-primary/20",
          active ? "bg-primary/10 border-primary/30 text-foreground" : "text-muted-foreground"
        )}
      >
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 text-primary">
          {icon}
        </span>
        <span className="font-medium">{children}</span>
      </button>
    </Link>
  );
}
