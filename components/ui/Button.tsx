import Link from "next/link";
import { cn } from "@/lib/cn";
import { LiquidStamp } from "@/components/ui/LiquidStamp";

type Variant = "primary" | "secondary" | "ghost" | "discord";
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
  "btn-v2 group relative inline-flex items-center justify-center gap-2 overflow-hidden isolate " +
  "rounded-full font-medium tracking-[0.01em] " +
  "transition-[background-color,color,transform,box-shadow,border-color] duration-200 " +
  "disabled:cursor-not-allowed disabled:opacity-60 " +
  "focus-visible:outline-none focus-visible:[outline:2px_solid_var(--color-mostarda-strong)] focus-visible:[outline-offset:3px] " +
  "active:translate-y-px";

const sizes: Record<Size, string> = {
  md: "px-[22px] py-3 text-[14px]",
  lg: "px-7 py-3.5 text-[15px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-olive text-cream active:bg-olive-deep " +
    "disabled:bg-ink-15 disabled:text-ink-40 disabled:[&_.liquid-layer]:hidden " +
    "shadow-[inset_0_-1px_0_rgba(0,0,0,0.18)]",
  discord:
    "bg-blurple text-white active:bg-blurple-deep hover:bg-blurple-deep " +
    "disabled:bg-ink-15 disabled:text-ink-40 " +
    "shadow-[inset_0_-1px_0_rgba(0,0,0,0.18)]",
  secondary:
    "bg-cream text-ink border border-olive hover:border-olive-deep " +
    "disabled:border-ink-15 disabled:text-ink-40 disabled:[&_.liquid-layer]:hidden",
  ghost:
    "bg-transparent text-ink-70 border-b-[0.5px] border-ink-15 rounded-none px-1 " +
    "hover:text-ink hover:border-ceramica disabled:text-ink-40",
};

function ButtonInner({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: Variant;
}) {
  return (
    <>
      <LiquidStamp variant={variant} />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );
}

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
          <ButtonInner variant={variant}>{children}</ButtonInner>
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...(rest as object)}>
        <ButtonInner variant={variant}>{children}</ButtonInner>
      </Link>
    );
  }

  const { children, className: _c, variant: _v, size: _s, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      <ButtonInner variant={variant}>{children}</ButtonInner>
    </button>
  );
}
