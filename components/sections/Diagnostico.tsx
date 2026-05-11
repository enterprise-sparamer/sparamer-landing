"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PostSubmitJourney } from "@/components/sections/PostSubmitJourney";

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
    service: "Diagnóstico personalizado",
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

  // Restore from localStorage after mount (avoids SSR hydration mismatch).
  useEffect(() => {
    const data = loadPersisted();
    if (data) {
      setStep(data.step);
      setAnswers(data.answers);
    }
    setHydrated(true);
  }, []);

  // Persist whenever step or answers change (after hydration).
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

      // Only handle if focus is within the section (or nothing has focus yet).
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

  // Cleanup advance timer on unmount.
  useEffect(() => {
    return () => {
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    };
  }, []);

  const progress = Math.min(step, totalQuestions) / totalQuestions;
  const counterStep = onEmailStep ? totalQuestions : step + 1;

  return (
    <section
      ref={sectionRef}
      id="diagnostico"
      aria-labelledby="diag-heading"
      className="diagnostic-section relative bg-cream"
    >
      <div className="diagnostic-section__inner">
        <div className="diag-form-col">
        {/* Section heading */}
        <header className="diag-header">
          <h2
            id="diag-heading"
            className="font-sans font-medium text-ink"
            style={{
              fontSize: "clamp(22px, 2vw, 24px)",
              letterSpacing: "-0.01em",
              lineHeight: 1.25,
            }}
          >
            Diagnóstico gratuito em 60 segundos.
          </h2>
          <p className="mt-3 text-[14px] leading-[1.55] text-ink-55">
            3 perguntas rápidas. Você recebe um plano sob medida — sem custo, sem ligação obrigatória.
          </p>
        </header>

        {!submitted && (
          <div
            className="diag-progress"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={totalQuestions}
            aria-valuenow={Math.min(step, totalQuestions)}
          >
            <div className="diag-progress-track">
              <div
                className="diag-progress-fill"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <span className="diag-progress-count" aria-hidden>
              {counterStep} / {totalQuestions}
            </span>
            {step > 0 && !onEmailStep && (
              <button
                type="button"
                onClick={goBack}
                className="diag-back"
                aria-label="Voltar uma pergunta"
              >
                <span aria-hidden>←</span> voltar
              </button>
            )}
            <span className="sr-only">
              {onEmailStep
                ? "Última etapa: deixe seu email."
                : `Pergunta ${counterStep} de ${totalQuestions}.`}
            </span>
          </div>
        )}

        {/* Form */}
        {!submitted && currentQuestion && (
          <div
            key={`q-${step}`}
            className="diag-step"
          >
            <fieldset
              className="m-0 border-0 p-0"
              aria-labelledby={`q-title-${step}`}
            >
              <legend
                id={`q-title-${step}`}
                className="diag-question block w-full font-sans font-medium text-ink"
                style={{
                  fontSize: "clamp(20px, 2.4vw, 22px)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                }}
              >
                {currentQuestion.title}
              </legend>

              <div role="radiogroup" className="diag-options">
                {currentQuestion.options.map((opt, i) => {
                  const selected = answers[currentQuestion.key] === opt.value;
                  const letter = String.fromCharCode(65 + i);
                  const id = `opt-${step}-${i}`;
                  return (
                    <label
                      key={opt.value}
                      htmlFor={id}
                      className={`diag-option ${selected ? "is-selected" : ""}`}
                    >
                      <input
                        id={id}
                        type="radio"
                        name={`question-${step}`}
                        value={opt.value}
                        checked={selected}
                        onChange={() => selectOption(currentQuestion, opt.value)}
                        className="sr-only"
                      />
                      <span className="diag-chip" aria-hidden>
                        {letter}
                      </span>
                      <span className="diag-option-label">{opt.label}</span>
                      {selected && (
                        <span className="diag-check" aria-hidden>
                          <svg
                            width="16"
                            height="16"
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
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <button
              type="button"
              onClick={escapeToContact}
              className="diag-escape"
            >
              <span className="diag-chip diag-chip-ghost" aria-hidden>
                E
              </span>
              <span className="diag-option-label">
                Outro caso — prefiro conversar direto
              </span>
            </button>
          </div>
        )}

        {/* Email step */}
        {!submitted && onEmailStep && (
          <form onSubmit={handleSubmit} className="diag-step" noValidate>
            <h3
              className="diag-question font-sans font-medium text-ink"
              style={{
                fontSize: "clamp(20px, 2.4vw, 22px)",
                letterSpacing: "-0.01em",
                lineHeight: 1.3,
              }}
            >
              Para qual e-mail enviamos o seu plano?
            </h3>

            <label
              htmlFor="diag-email"
              className="mb-2 block text-[13px] text-ink-55"
            >
              Seu email
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
                className="mt-3 text-[13px] text-ink"
              >
                {error}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={pending}
                aria-disabled={pending}
                aria-busy={pending}
                className="btn-primary"
              >
                {pending ? "Enviando…" : "Receber meu plano gratuito"}
              </button>
              <button
                type="button"
                onClick={goBack}
                className="diag-back-link"
              >
                ← voltar
              </button>
            </div>
          </form>
        )}

        {/* Success */}
        {submitted && (
          <div className="diag-step">
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
            <h3
              className="mt-5 font-sans font-medium text-ink"
              style={{
                fontSize: "clamp(20px, 2.4vw, 22px)",
                letterSpacing: "-0.01em",
                lineHeight: 1.3,
              }}
            >
              Recebido. Resposta em até 24h úteis.
            </h3>
            <p className="mt-3 text-[14px] leading-[1.6] text-ink-55">
              Vamos analisar o seu contexto com atenção e enviar um plano
              personalizado para{" "}
              <span className="text-ink">{email}</span>. Sem CRM, sem
              newsletter, sem sequência automatizada.
            </p>
          </div>
        )}

        {/* Keyboard hint */}
        {!submitted && !onEmailStep && (
          <p className="diag-hint font-mono text-[11px] text-ink-40">
            dica: aperte A · B · C · D no teclado
          </p>
        )}

        {/* Mobile: collapsed 2-line summary instead of the full journey */}
        {!submitted && (
          <p className="diag-journey-mobile">
            Em até 24h úteis enviamos um plano sob medida para o seu e-mail. Sem CRM, sem
            newsletter, sem upsell.
          </p>
        )}
        </div>

        {/* Desktop / tablet: full journey column */}
        {!submitted && (
          <div className="diag-journey-col">
            <PostSubmitJourney />
          </div>
        )}
      </div>
    </section>
  );
}
