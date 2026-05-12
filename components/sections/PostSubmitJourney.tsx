export function PostSubmitJourney() {
  return (
    <aside
      className="diag-journey"
      aria-label="O que acontece depois que você responde"
    >
      <p className="diag-journey-label">
        <span>O que acontece</span>
        <span className="diag-journey-label-line" aria-hidden />
        <span>depois</span>
      </p>

      <ol className="diag-journey-steps">
        <li className="diag-journey-step">
          <span
            className="diag-journey-num"
            style={{ color: "var(--color-olive)" }}
          >
            01
          </span>
          <div>
            <p className="diag-journey-title">Análise do contexto</p>
            <p className="diag-journey-detail">
              Em até 24 h úteis, com atenção real.
            </p>
          </div>
        </li>
        <li className="diag-journey-step">
          <span
            className="diag-journey-num"
            style={{ color: "var(--color-mostarda-strong)" }}
          >
            02
          </span>
          <div>
            <p className="diag-journey-title">Plano sob medida</p>
            <p className="diag-journey-detail">
              Direto no seu e-mail, escrito para a sua realidade.
            </p>
          </div>
        </li>
        <li className="diag-journey-step">
          <span
            className="diag-journey-num"
            style={{ color: "var(--color-ceramica)" }}
          >
            03
          </span>
          <div>
            <p className="diag-journey-title">Conversa, se fizer sentido</p>
            <p className="diag-journey-detail">
              30 minutos de call, sem compromisso.
            </p>
          </div>
        </li>
      </ol>

      <p className="diag-journey-seal">
        Sem CRM
        <br />
        Sem newsletter
        <br />
        Sem upsell
      </p>
    </aside>
  );
}
