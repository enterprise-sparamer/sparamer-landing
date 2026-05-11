import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
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
  "btn-v2 group relative inline-flex items-center justify-center gap-2 overflow-visible " +
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
    "bg-olive text-cream " +
    "[&:hover_.btn-stamp]:animate-[stamp-in_var(--stamp-duration)_var(--stamp-ease)_forwards] " +
    "active:bg-olive-deep [&:active_.btn-stamp]:animate-[stamp-press_120ms_var(--stamp-ease)_forwards] " +
    "disabled:bg-ink-15 disabled:text-ink-40 disabled:[&_.btn-stamp]:hidden " +
    "shadow-[inset_0_-1px_0_rgba(0,0,0,0.18)]",
  secondary:
    "bg-cream text-ink border border-olive " +
    "hover:border-olive-deep " +
    "[&:hover_.btn-stamp]:animate-[stamp-in_var(--stamp-duration)_var(--stamp-ease)_forwards] " +
    "disabled:border-ink-15 disabled:text-ink-40 disabled:[&_.btn-stamp]:hidden",
  ghost:
    "bg-transparent text-ink-70 border-b-[0.5px] border-ink-15 rounded-none px-1 " +
    "hover:text-ink hover:border-ceramica " +
    "[&:hover_.btn-stamp]:animate-[stamp-in_var(--stamp-duration)_var(--stamp-ease)_forwards] " +
    "disabled:text-ink-40 disabled:[&_.btn-stamp]:hidden",
};

const stampShape: Record<Variant, string> = {
  primary:
    "right-[-8px] top-[-8px] h-[28px] w-[28px] rounded-full bg-mostarda-stamp [box-shadow:0_2px_0_var(--stamp-shadow)]",
  secondary:
    "left-[18%] bottom-[-3px] h-[4px] w-[40%] bg-mostarda-stamp",
  ghost:
    "left-[-12px] top-1/2 -translate-y-1/2 h-[8px] w-[8px] bg-mostarda-stamp",
};

function StampedChildren({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: Variant;
}) {
  return (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
      <span
        aria-hidden
        className={cn(
          "btn-stamp pointer-events-none absolute z-0 opacity-0",
          stampShape[variant],
        )}
      />
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
          <StampedChildren variant={variant}>{children}</StampedChildren>
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...(rest as object)}>
        <StampedChildren variant={variant}>{children}</StampedChildren>
      </Link>
    );
  }

  const { children, className: _c, variant: _v, size: _s, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      <StampedChildren variant={variant}>{children}</StampedChildren>
    </button>
  );
}
