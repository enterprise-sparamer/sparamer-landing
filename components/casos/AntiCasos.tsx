import type { AntiCases } from "@/types/cases";

export function AntiCasos({ data }: { data: AntiCases }) {
  return (
    <section className="anti-casos" aria-labelledby="anti-casos-title">
      <div className="anti-casos__head">
        <span className="anti-casos__eyebrow">MANIFESTO · LIMITES</span>
        <h2 className="anti-casos__title" id="anti-casos-title">
          {data.titulo}
        </h2>
        <p className="anti-casos__lead">{data.subtitulo}</p>
      </div>

      <ol className="anti-casos__list">
        {data.itens.map((item, i) => (
          <li key={i} className="anti-casos__item">
            <span className="anti-casos__num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="anti-casos__text">{item}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
