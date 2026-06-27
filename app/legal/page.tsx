import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

const TITLE = "Legal e privacidade";
const DESCRIPTION =
  "Identificação da empresa Sparamer, aviso de privacidade segundo a LGPD (Lei nº 13.709/2018) e direitos do titular dos dados pessoais.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/legal" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl("/legal"),
  },
};

const LAST_UPDATED = "10 de maio de 2026";
const EMAIL = "contato@sparamer.com";

const identification = [
  {
    label: "Razão social",
    value: "Luis Alfr Chap Gomez Cons Tecn Informacao Ltda",
  },
  { label: "Nome fantasia", value: "Sparamer" },
  { label: "CNPJ", value: "65.977.336/0001-54" },
  {
    label: "Endereço fiscal",
    value:
      "Rua Pais Leme, 215, sala 1713 — Pinheiros, São Paulo / SP — 05424-150",
  },
  { label: "E-mail", value: EMAIL, href: `mailto:${EMAIL}` },
];

const rights = [
  "Confirmação da existência de tratamento dos seus dados",
  "Acesso aos dados que mantemos sobre você",
  "Correção de dados incompletos, inexatos ou desatualizados",
  "Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade",
  "Portabilidade dos dados para outro fornecedor",
  "Eliminação dos dados tratados com base em consentimento",
  "Informação sobre entidades públicas e privadas com as quais compartilhamos dados",
  "Revogação do consentimento, a qualquer momento",
];

export default function LegalPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative z-10">
        {/* ── Header ──────────────────────────────────────────── */}
        <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-24">
          <div className="mx-auto max-w-[860px] px-6 lg:px-12">
            <Eyebrow number="00">Legal</Eyebrow>
            <h1
              className="mt-8 font-display font-normal tracking-tight text-ink head-cling"
              style={{
                fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
                lineHeight: "1.05",
                letterSpacing: "-0.025em",
              }}
            >
              Informações legais{" "}
              <span className="text-ink-55">e política de privacidade.</span>
            </h1>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-40">
              Última atualização · {LAST_UPDATED}
            </p>
          </div>
        </section>

        <div className="hairline" />

        {/* ── Body ────────────────────────────────────────────── */}
        <section className="relative py-20 lg:py-24">
          <div className="mx-auto max-w-[860px] px-6 lg:px-12">
            {/* [01] Identificação */}
            <Article
              number="01"
              eyebrow="Empresa"
              title="Identificação da empresa"
            >
              <p>
                Sparamer é o nome fantasia da pessoa jurídica abaixo
                identificada, devidamente inscrita no CNPJ e estabelecida no
                endereço fiscal a seguir:
              </p>
              <dl className="mt-8 space-y-5 border-t border-ink-15 pt-8">
                {identification.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-3 gap-6 border-b border-ink-15 pb-4 last:border-0"
                  >
                    <dt className="eyebrow">{row.label}</dt>
                    <dd className="col-span-2 text-[14px]">
                      {row.href ? (
                        <a
                          href={row.href}
                          className="text-ink transition-colors hover:text-ceramica"
                        >
                          {row.value}
                        </a>
                      ) : (
                        <span className="text-ink">{row.value}</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Article>

            {/* [02] Privacidade */}
            <Article
              number="02"
              eyebrow="Privacidade"
              title="Aviso de privacidade (LGPD)"
            >
              <p>
                Este aviso descreve, de forma transparente, como a Sparamer
                trata os dados pessoais coletados em razão do contato comercial
                e da execução dos serviços contratados, em total conformidade
                com a Lei nº 13.709/2018 (Lei Geral de Proteção de Dados —
                LGPD).
              </p>

              <SubHeading>Dados que coletamos</SubHeading>
              <p>
                Coletamos apenas o estritamente necessário para responder ao
                seu contato e executar os serviços que você nos contrata:
              </p>
              <ul>
                <li>
                  <strong>Dados de identificação:</strong> nome, e-mail e
                  empresa, fornecidos por você quando entra em contato.
                </li>
                <li>
                  <strong>Conteúdo da comunicação:</strong> mensagens trocadas
                  por e-mail, incluindo descrições de problemas e contexto
                  técnico.
                </li>
                <li>
                  <strong>Dados de execução do serviço:</strong> credenciais e
                  acessos compartilhados explicitamente por você para fins de
                  configuração e implementação, mantidos apenas pelo tempo
                  necessário.
                </li>
              </ul>

              <SubHeading>Finalidade</SubHeading>
              <p>
                Tratamos esses dados exclusivamente para responder ao seu
                contato, elaborar propostas comerciais, executar os serviços
                contratados, emitir notas fiscais e cumprir obrigações legais e
                regulatórias.
              </p>

              <SubHeading>Base legal</SubHeading>
              <p>
                Os dados são tratados com fundamento no{" "}
                <span className="text-ink">
                  art. 7º, V e IX
                </span>{" "}
                da LGPD — execução de contrato, procedimentos preliminares
                relacionados a contrato e legítimo interesse —, além das bases
                aplicáveis a obrigações legais e fiscais.
              </p>

              <SubHeading>Compartilhamento</SubHeading>
              <p>
                Não comercializamos dados pessoais. Para a operação do nosso
                serviço, podemos utilizar subprocessadores (por exemplo,
                provedores de e-mail, hospedagem em nuvem e ferramentas de
                produtividade), todos submetidos a obrigações contratuais de
                confidencialidade e segurança. A lista completa de
                subprocessadores pode ser solicitada a qualquer momento pelo
                e-mail{" "}
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-ink underline decoration-ink-15 underline-offset-[4px] hover:text-ceramica hover:decoration-ceramica"
                >
                  {EMAIL}
                </a>
                .
              </p>

              <SubHeading>Retenção</SubHeading>
              <p>
                Mantemos os seus dados pelo tempo da relação comercial e, após
                o seu encerramento, pelo prazo legal de 5 (cinco) anos para
                fins fiscais e regulatórios. Comunicações comerciais sem
                contratação efetiva são eliminadas em até 12 meses, salvo
                obrigação legal em sentido contrário.
              </p>

              <SubHeading>Segurança</SubHeading>
              <p>
                Adotamos medidas técnicas e organizacionais adequadas para
                proteger os dados pessoais contra acessos não autorizados,
                perda, alteração ou divulgação indevida — incluindo
                criptografia em trânsito, controle de acesso e revisões
                periódicas de segurança.
              </p>
            </Article>

            {/* [03] Direitos */}
            <Article
              number="03"
              eyebrow="Direitos LGPD"
              title="Direitos do titular"
            >
              <p>
                Como titular de dados pessoais, você tem os direitos
                assegurados pelo art. 18 da LGPD. A qualquer momento, você pode
                solicitar:
              </p>
              <ul>
                {rights.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <p className="mt-8">
                Para exercer qualquer um desses direitos, basta escrever para{" "}
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-ink underline decoration-ink-15 underline-offset-[4px] hover:text-ceramica hover:decoration-ceramica"
                >
                  {EMAIL}
                </a>
                . Responderemos no prazo legal.
              </p>
            </Article>

            {/* [04] DPO */}
            <Article
              number="04"
              eyebrow="Encarregado"
              title="Encarregado de dados (DPO)"
            >
              <p>
                A pessoa responsável pelo tratamento de dados pessoais e canal
                oficial de comunicação com os titulares e com a Autoridade
                Nacional de Proteção de Dados (ANPD) é{" "}
                <span className="text-ink">Luis Alfredo Chaparro Gomez</span>,
                fundador da Sparamer.
              </p>
              <dl className="mt-8 space-y-5 border-t border-ink-15 pt-8">
                <div className="grid grid-cols-3 gap-6 border-b border-ink-15 pb-4 last:border-0">
                  <dt className="eyebrow">Nome</dt>
                  <dd className="col-span-2 text-[14px] text-ink">
                    Luis Alfredo Chaparro Gomez
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-6 border-b border-ink-15 pb-4 last:border-0">
                  <dt className="eyebrow">E-mail</dt>
                  <dd className="col-span-2 text-[14px]">
                    <a
                      href={`mailto:${EMAIL}`}
                      className="text-ink transition-colors hover:text-ceramica"
                    >
                      {EMAIL}
                    </a>
                  </dd>
                </div>
              </dl>
            </Article>

            {/* Footer note */}
            <div className="mt-24 border-t border-ink-15 pt-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-40">
                Lei Geral de Proteção de Dados — Lei nº 13.709/2018 ·
                Atualizado em {LAST_UPDATED}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Início", path: "/" },
              { name: "Legal", path: "/legal" },
            ]),
          ),
        }}
      />
    </>
  );
}

function Article({
  number,
  title,
  eyebrow,
  children,
}: {
  number: string;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <article className="border-t border-ink-15 py-16 first:border-t-0 first:pt-0">
      <Eyebrow number={number}>{eyebrow ?? "Seção"}</Eyebrow>
      <h2
        className="mt-6 font-display font-normal tracking-tight text-ink"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: "1.1" }}
      >
        {title}
      </h2>
      <div className="legal-body mt-10 space-y-6 text-[16px] leading-[1.75] text-ink/85">
        {children}
      </div>
    </article>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-mostarda-strong">
      {children}
    </h3>
  );
}
