export function PostSubmitJourney() {
  return (
    <aside
      className="diag-journey"
      aria-label="O que acontece depois que você responde"
    >
      <div className="label-mono">o que acontece depois</div>

      <ol className="steps">
        <li>
          <span
            className="step-num"
            style={{ color: "var(--color-olive)" }}
          >
            01
          </span>
          <div>
            <p className="step-title">analisamos o seu contexto</p>
            <p className="step-detail">em até 24h úteis, com atenção real</p>
          </div>
        </li>
        <li>
          <span
            className="step-num"
            style={{ color: "var(--color-mostarda-strong)" }}
          >
            02
          </span>
          <div>
            <p className="step-title">enviamos um plano sob medida</p>
            <p className="step-detail">
              direto no seu e-mail, escrito pra sua realidade
            </p>
          </div>
        </li>
        <li>
          <span
            className="step-num"
            style={{ color: "var(--color-ceramica)" }}
          >
            03
          </span>
          <div>
            <p className="step-title">se fizer sentido, conversamos</p>
            <p className="step-detail">30 minutos de call, sem compromisso</p>
          </div>
        </li>
      </ol>

      <hr className="divider" />

      <div className="trust-seal">sem CRM · sem newsletter · sem upsell</div>
    </aside>
  );
}
