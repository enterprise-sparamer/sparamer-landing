import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { palette, inkOpacity, cssVar } from "@/lib/tokens";

export const metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

export default function StyleguidePage() {
  if (process.env.NEXT_PUBLIC_SHOW_STYLEGUIDE !== "1") notFound();

  return (
    <main className="min-h-screen bg-cream text-ink px-8 py-16 lg:px-16 lg:py-24">
      <header className="mb-16 max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mostarda-strong">
          styleguide
        </p>
        <h1 className="mt-3 text-display font-medium">
          Sparamer · 4-color palette + ink
        </h1>
        <p className="mt-4 text-[15px] text-ink-70 max-w-prose">
          Single source: <code>app/globals.css :root</code> +{" "}
          <code>lib/tokens.ts</code>. If anything on this page renders an
          unexpected hue, the build is wrong.
        </p>
      </header>

      <Section title="Base palette">
        <Swatch name="cream"    hex={palette.cream}    fg="ink" />
        <Swatch name="ink"      hex={palette.ink}      fg="cream" />
        <Swatch name="olive"    hex={palette.olive}    fg="cream" />
        <Swatch name="mostarda" hex={palette.mostarda} fg="ink" />
        <Swatch name="ceramica" hex={palette.ceramica} fg="cream" />
      </Section>

      <Section title="Ink opacities">
        {(["70", "55", "40", "15"] as const).map((k) => (
          <Swatch
            key={k}
            name={`ink-${k}`}
            hex={inkOpacity[Number(k) as 70 | 55 | 40 | 15]}
            fg="ink"
          />
        ))}
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">primary md</Button>
          <Button variant="primary" size="lg">primary lg</Button>
          <Button variant="primary" disabled>disabled</Button>
          <Button variant="ghost">ghost link</Button>
          <Button variant="ghost" size="lg">ghost lg</Button>
        </div>
      </Section>

      <Section title="Brand dot">
        <span className="inline-flex items-center gap-2 text-[13px] font-mono text-ink-70">
          <span className="brand-dot" aria-hidden="true" />
          <span>brand-dot · decorative</span>
        </span>
      </Section>

      <Section title="Error numerals">
        <div className="flex flex-wrap gap-8 font-display text-[80px] leading-none">
          {(["401", "404", "500"] as const).map((c) => (
            <span
              key={c}
              style={{
                color:
                  c === "401"
                    ? cssVar.olive
                    : c === "404"
                    ? cssVar.mostarda
                    : cssVar.ceramica,
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Focus ring sample">
        <button
          type="button"
          className="rounded-full bg-cream border border-ink-15 px-5 py-2 text-ink focus-visible:outline-none focus-visible:[outline:2px_solid_var(--color-ink)] focus-visible:[outline-offset:3px]"
        >
          tab to me
        </button>
      </Section>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-55 mb-6">
        {title}
      </h2>
      <div className="flex flex-wrap gap-4">{children}</div>
    </section>
  );
}

function Swatch({
  name,
  hex,
  fg,
}: {
  name: string;
  hex: string;
  fg: "ink" | "cream";
}) {
  return (
    <div
      className="w-44 h-32 rounded-md p-4 border border-ink-15 flex flex-col justify-between"
      style={{ background: hex }}
    >
      <span
        className={
          fg === "ink"
            ? "text-ink font-mono text-[11px]"
            : "text-cream font-mono text-[11px]"
        }
      >
        {name}
      </span>
      <code
        className={
          fg === "ink" ? "text-ink-70 text-[11px]" : "text-cream/80 text-[11px]"
        }
      >
        {hex}
      </code>
    </div>
  );
}
