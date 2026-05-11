"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PostSubmitJourney } from "@/components/sections/PostSubmitJourney";
import { Button } from "@/components/ui/Button";

type Answers = {
  goal?: "vender" | "centralizar" | "escalar" | "lancar";
  urgency?: "urgente" | "trimestre" | "estrategico";
  stack?: "zoho" | "discord" | "varios" | "zero";
};

type QuestionKey = keyof Answers;

type Question = {
  key: QuestionKey;
  title: string;
  options: { value: string; label: string }[];
};

type Recommendation = {
  service: string;
  tag: string;
  scope: string;
  involves: string;
  servicoSlug: string;
};

const STORAGE_KEY = "sparamer.diag.v1";
const STORAGE_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const DOC_EDITION = "2026";

const questions: Question[] = [
  {
    key: "goal",
    title: "Qual é a meta da sua empresa nos próximos 6 meses?",
    options: [
      { value: "vender", label: "Vender mais sem contratar mais gente" },
      { value: "centralizar", label: "Unificar dados entre as ferramentas que já usamos" },
      { value: "escalar", label: "Escalar suporte ou comunidade mantendo a qualidade" },
      { value: "lancar", label: "Lançar um novo produto com integrações sob medida" },
    ],
  },
  {
    key: "urgency",
    title: "Quando você precisa ver resultado em produção?",
    options: [
      { value: "urgente", label: "Para ontem — nas próximas 4 semanas" },
      { value: "trimestre", label: "Dentro do próximo trimestre" },
      { value: "estrategico", label: "É um movimento estratégico, posso planejar 2–3 meses" },
    ],
  },
  {
    key: "stack",
    title: "Qual o cenário atual da sua operação?",
    options: [
      { value: "zoho", label: "Já rodamos em Zoho (CRM, Books, Desk, etc.)" },
      { value: "discord", label: "Temos uma comunidade ativa no Discord" },
      { value: "varios", label: "Vários SaaS que não se conversam" },
      { value: "zero", label: "Estamos estruturando do zero" },
    ],
  },
];

function recommend(answers: Answers): Recommendation {
  const { goal, stack } = answers;

  if (goal === "lancar") {
    return {
      service: "Solution Architecture sob medida",
      tag: "arquitetura · integrações · MVP",
      scope: "6–12 semanas",
      involves:
        "desenho da arquitetura, escolha da stack ideal, implementação das integrações críticas e setup de infraestrutura pronta para escalar.",
      servicoSlug: "automacoes",
    };
  }

  if (goal === "centralizar") {
    return {
      service: "Integrações & Automações — uma única fonte de verdade",
      tag: "ETL · webhooks · pipelines de dados",
      scope: "4–10 semanas",
      involves:
        "mapeamento das fontes de dados, sincronização em tempo real entre ferramentas e dashboards executivos consolidados para decisões mais rápidas.",
      servicoSlug: "automacoes",
    };
  }

  if (goal === "vender") {
    if (stack === "zoho") {
      return {
        service: "Zoho Ecosystem — pipeline comercial sob esteróides",
        tag: "Zoho CRM · Flow · Books",
        scope: "3–6 semanas",
        involves:
          "automação completa do funil de vendas, integração entre CRM e cobrança, dashboards executivos e relatórios de receita em tempo real.",
        servicoSlug: "zoho",
      };
    }
    return {
      service: "Integrações & Automações — funil de vendas conectado",
      tag: "CRM · automação · cobrança",
      scope: "4–8 semanas",
      involves:
        "implantação ou integração de CRM, automação de follow-ups, conexão com ferramentas de cobrança e analytics para acelerar a conversão.",
      servicoSlug: "automacoes",
    };
  }

  if (goal === "escalar") {
    if (stack === "discord") {
      return {
        service: "Discord & Comunidades — suporte que escala",
        tag: "bot · moderação · onboarding",
        scope: "3–6 semanas",
        involves:
          "bot de suporte tier-1 sob medida, sistema de tickets, onboarding automatizado e métricas reais de engajamento da comunidade.",
        servicoSlug: "discord",
      };
    }
    if (stack === "zoho") {
      return {
        service: "Zoho Ecosystem — operação de suporte com SLA",
        tag: "Zoho Desk · workflows · SLA",
        scope: "4–8 semanas",
        involves:
          "implantação do Zoho Desk, automação de tickets, controle de SLA e integração com WhatsApp, e-mail e demais canais do cliente.",
        servicoSlug: "zoho",
      };
    }
    return {
      service: "Integrações & Automações — central de atendimento",
      tag: "tickets · automação · SLA",
      scope: "4–8 semanas",
      involves:
        "centralização dos canais de suporte, automação de tickets, roteamento inteligente e métricas operacionais para crescer sem perder qualidade.",
      servicoSlug: "automacoes",
    };
  }

  return {
    service: "Consulta personalizada",
    tag: "conversa exploratória sem compromisso",
    scope: "a alinhar",
    involves:
      "uma conversa inicial para entender o seu contexto a fundo e desenhar o caminho mais curto até o resultado.",
    servicoSlug: "geral",
  };
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

type Persisted = { step: number; answers: Answers; ts: number };

function loadPersisted(): Persisted | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<Persisted>;
    if (
      typeof data?.step !== "number" ||
      data.step < 0 ||
      data.step > questions.length ||
      !data.answers ||
      typeof data.answers !== "object" ||
      typeof data.ts !== "number" ||
      Date.now() - data.ts > STORAGE_TTL_MS
    ) {
      return null;
    }
    return data as Persisted;
  } catch {
    return null;
  }
}

function persist(step: number, answers: Answers) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ step, answers, ts: Date.now() } satisfies Persisted),
    );
  } catch {
    // Ignore quota / privacy mode failures.
  }
}

function clearPersisted() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore.
  }
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function Diagnostico() {
  const [hydrated, setHydrated] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const advanceTimer = useRef<number | null>(null);

  const totalQuestions = questions.length;
  const onEmailStep = step === totalQuestions;
  const currentQuestion = !onEmailStep ? questions[step] : null;

  useEffect(() => {
    const data = loadPersisted();
    if (data) {
      setStep(data.step);
      setAnswers(data.answers);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || submitted) return;
    persist(step, answers);
  }, [hydrated, step, answers, submitted]);

  const selectOption = useCallback(
    (question: Question, value: string) => {
      setAnswers((prev) => ({ ...prev, [question.key]: value }));
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
      const delay = reducedMotion ? 0 : 220;
      advanceTimer.current = window.setTimeout(() => {
        setStep((s) => Math.min(s + 1, totalQuestions));
      }, delay);
    },
    [reducedMotion, totalQuestions],
  );

  const goBack = useCallback(() => {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const escapeToContact = useCallback(() => {
    persist(step, answers);
    const target = document.getElementById("contato");
    if (target) {
      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    }
  }, [step, answers, reducedMotion]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          answers,
          recommendation: recommend(answers),
          ts: Date.now(),
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      clearPersisted();
      setSubmitted(true);
    } catch {
      setError("Não conseguimos enviar. Tente novamente em alguns minutos.");
      setPending(false);
    }
  }

  // Keyboard shortcuts: A/B/C/D selects, E escapes, Esc backs.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const active = document.activeElement;
      const inEditable =
        active instanceof HTMLInputElement ||
        active instanceof HTMLTextAreaElement ||
        (active instanceof HTMLElement && active.isContentEditable);
      if (inEditable) return;
      if (submitted) return;

      const within =
        sectionRef.current &&
        (sectionRef.current.contains(active) || active === document.body);
      if (!within) return;

      const key = e.key.toLowerCase();

      if (key === "escape") {
        if (step > 0 && step <= totalQuestions) {
          e.preventDefault();
          goBack();
        }
        return;
      }

      if (currentQuestion) {
        if (key === "e") {
          e.preventDefault();
          escapeToContact();
          return;
        }
        const idx = ["a", "b", "c", "d"].indexOf(key);
        if (idx >= 0 && idx < currentQuestion.options.length) {
          e.preventDefault();
          selectOption(currentQuestion, currentQuestion.options[idx].value);
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    step,
    totalQuestions,
    currentQuestion,
    submitted,
    selectOption,
    goBack,
    escapeToContact,
  ]);

  useEffect(() => {
    return () => {
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    };
  }, []);

  const progress = Math.min(step, totalQuestions) / totalQuestions;
  const counterStep = onEmailStep ? totalQuestions + 1 : step + 1;
  const totalSteps = totalQuestions + 1;
  const stepRef = submitted
    ? "RECEBIDO"
    : onEmailStep
      ? `E — ${pad2(totalSteps)} / ${pad2(totalSteps)}`
      : `Q.${pad2(counterStep)} / ${pad2(totalSteps)}`;

  return (
    <section
      ref={sectionRef}
      id="diagnostico"
      aria-labelledby="diag-heading"
      className="diagnostic-section relative bg-cream"
    >
      <div className="diagnostic-section__inner">
        {/* Running header — document register */}
        <header className="diag-doc-head" aria-hidden>
          <span className="diag-doc-id">
            <span className="diag-doc-id-strong">Sparamer</span>
            <span className="diag-doc-id-sep">—</span>
            <span>Consulta</span>
          </span>
          <span className="diag-doc-meta">
            <span>Formulário 01</span>
            <span className="diag-doc-id-sep">·</span>
            <span>Edição {DOC_EDITION}</span>
          </span>
        </header>
        <hr className="diag-rule" />

        <div className="diag-grid">
          <div className="diag-main">
            {!submitted && (
              <header className="diag-intro">
                <h2 id="diag-heading" className="diag-display">
                  <span className="diag-display-line">Três perguntas.</span>
                  <span className="diag-display-line diag-display-soft">
                    Um plano sob medida.
                  </span>
                </h2>
                <p className="diag-lead">
                  60 segundos para responder. Em até 24&nbsp;h úteis enviamos o
                  plano direto no seu e-mail — escrito para o seu contexto, não
                  para o seu segmento.
                </p>
              </header>
            )}

            {!submitted && (
              <div
                className="diag-step-register"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={totalSteps}
                aria-valuenow={Math.min(counterStep, totalSteps)}
              >
                <span className="diag-step-ref">{stepRef}</span>
                <div className="diag-step-track" aria-hidden>
                  <div
                    className="diag-step-track-fill"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="diag-back-mono"
                    aria-label="Voltar uma pergunta"
                  >
                    <span aria-hidden>←</span> voltar
                  </button>
                ) : (
                  <span className="diag-step-spacer" aria-hidden />
                )}
                <span className="sr-only">
                  {onEmailStep
                    ? "Última etapa: deixe seu e-mail."
                    : `Pergunta ${counterStep} de ${totalSteps}.`}
                </span>
              </div>
            )}

            {!submitted && currentQuestion && (
              <div key={`q-${step}`} className="diag-step">
                <fieldset
                  className="diag-fieldset"
                  aria-labelledby={`q-title-${step}`}
                >
                  <legend id={`q-title-${step}`} className="diag-q-title">
                    {currentQuestion.title}
                  </legend>

                  <ol role="radiogroup" className="diag-options">
                    {currentQuestion.options.map((opt, i) => {
                      const selected = answers[currentQuestion.key] === opt.value;
                      const letter = String.fromCharCode(65 + i);
                      const id = `opt-${step}-${i}`;
                      return (
                        <li
                          key={opt.value}
                          className={`diag-option ${selected ? "is-selected" : ""}`}
                        >
                          <label htmlFor={id} className="diag-option-row">
                            <input
                              id={id}
                              type="radio"
                              name={`question-${step}`}
                              value={opt.value}
                              checked={selected}
                              onChange={() =>
                                selectOption(currentQuestion, opt.value)
                              }
                              className="sr-only"
                            />
                            <span className="diag-option-letter" aria-hidden>
                              {letter}
                            </span>
                            <span className="diag-option-label">{opt.label}</span>
                            <span className="diag-option-state" aria-hidden>
                              {selected ? (
                                <svg
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M5 12 L 10 17 L 19 7"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              ) : (
                                <span className="diag-option-dot" />
                              )}
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ol>
                </fieldset>

                <button
                  type="button"
                  onClick={escapeToContact}
                  className="diag-escape"
                >
                  <span
                    className="diag-option-letter diag-option-letter--ghost"
                    aria-hidden
                  >
                    E
                  </span>
                  <span className="diag-escape-label">
                    Outro caso — prefiro conversar direto
                  </span>
                  <span aria-hidden className="diag-escape-arrow">
                    ↗
                  </span>
                </button>
              </div>
            )}

            {!submitted && onEmailStep && (
              <form onSubmit={handleSubmit} className="diag-step" noValidate>
                <h3 className="diag-q-title">
                  Para qual e-mail enviamos o seu plano?
                </h3>

                <label htmlFor="diag-email" className="diag-email-label">
                  Endereço de e-mail
                </label>
                <input
                  id="diag-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-describedby={error ? "diag-email-error" : undefined}
                  placeholder="voce@empresa.com"
                  className="diag-email-input"
                />

                {error && (
                  <p
                    id="diag-email-error"
                    role="alert"
                    className="diag-error"
                  >
                    {error}
                  </p>
                )}

                <div className="diag-email-actions">
                  <Button
                    type="submit"
                    disabled={pending}
                    aria-disabled={pending}
                    aria-busy={pending}
                  >
                    {pending ? "Enviando…" : "Enviar e receber o plano"}
                  </Button>
                  <button
                    type="button"
                    onClick={goBack}
                    className="diag-back-mono"
                  >
                    <span aria-hidden>←</span> voltar
                  </button>
                </div>
              </form>
            )}

            {submitted && (
              <div className="diag-step diag-success">
                <span className="diag-success-mark" aria-hidden>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12 L 10 17 L 19 7"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h2 id="diag-heading" className="diag-display">
                  <span className="diag-display-line">Recebido.</span>
                  <span className="diag-display-line diag-display-soft">
                    Resposta em 24&nbsp;h úteis.
                  </span>
                </h2>
                <p className="diag-lead">
                  Vamos analisar o seu contexto com atenção e enviar um plano
                  para{" "}
                  <span className="diag-success-email">{email}</span>. Sem CRM,
                  sem newsletter, sem sequência automatizada.
                </p>
              </div>
            )}

            {!submitted && (
              <p className="diag-journey-mobile">
                Em até 24&nbsp;h úteis, plano sob medida no seu e-mail.{" "}
                <span className="diag-journey-mobile-seal">
                  sem CRM · sem newsletter · sem upsell
                </span>
              </p>
            )}
          </div>

          {!submitted && (
            <aside className="diag-side">
              <PostSubmitJourney />
            </aside>
          )}
        </div>

        <hr className="diag-rule" />
        <footer className="diag-doc-foot" aria-hidden>
          <span>pg. {pad2(Math.min(counterStep, totalSteps))} / {pad2(totalSteps)}</span>
          {!submitted && !onEmailStep ? (
            <span className="diag-doc-foot-keys">
              <span>A</span>
              <span className="diag-doc-id-sep">·</span>
              <span>B</span>
              <span className="diag-doc-id-sep">·</span>
              <span>C</span>
              <span className="diag-doc-id-sep">·</span>
              <span>D</span>
              <span className="diag-doc-id-sep">·</span>
              <span>E</span>
              <span className="diag-doc-foot-keys-hint">↩ no teclado</span>
            </span>
          ) : (
            <span className="diag-doc-foot-keys diag-doc-foot-keys--quiet">
              {submitted ? "obrigado." : "↵ enter para enviar"}
            </span>
          )}
          <span>Sparamer · {DOC_EDITION}</span>
        </footer>
      </div>
    </section>
  );
}
