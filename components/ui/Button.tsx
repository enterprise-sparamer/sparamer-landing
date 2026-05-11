import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost";
type Size = "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:[outline:2px_solid_var(--color-ink)] focus-visible:[outline-offset:3px] active:scale-[0.98]";

const sizes: Record<Size, string> = {
  md: "px-[22px] py-3 text-[14px]",
  lg: "px-7 py-3.5 text-[15px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-mostarda text-ink hover:bg-olive hover:text-cream disabled:bg-ink-15 disabled:text-ink-40",
  ghost:
    "bg-transparent text-ink-70 border-b-[0.5px] border-ink-15 hover:text-ink hover:border-ceramica disabled:text-ink-40",
};

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const classes = cn(base, sizes[size], variants[variant], props.className);

  if ("href" in props && props.href !== undefined) {
    const { href, external, children, className: _c, variant: _v, size: _s, ...rest } = props;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...(rest as object)}>
        {children}
      </Link>
    );
  }

  const { children, className: _c, variant: _v, size: _s, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
