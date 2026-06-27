# Sparamer — Estratégia de Preços & Posicionamento (rascunho para aprovação)

> Versão 1 · 2026-06-26 · baseada em pesquisa de mercado verificada (BRL).
> Mercado-alvo: **PMEs e scale-ups brasileiras**. Posicionamento: **agência** ("nós").
> Modelo: **liderar com projetos de escopo fixo**; retainer como receita recorrente secundária.

Todas as faixas estão ancoradas em fontes verificadas (confiança indicada por linha). Onde o Brasil não publica preço (caso típico do nicho Zoho), os números são **triangulados** e marcados como tal — devem ser validados com 3–5 cotações reais nos primeiros meses.

---

## 1. Posicionamento (agência)

A Sparamer é uma **agência brasileira de engenharia de processos** — pequena, sênior e dona do problema de ponta a ponta. O ponto doce não é "configurador de CRM" nem "agência enterprise com camadas de gerente de conta", e sim: **você fala direto com quem constrói.**

Quatro alavancas de posicionamento:

1. **Stack raro como moat.** Python + Google Cloud (trilha de certificação Professional Cloud Developer) + Zoho profundo (CRM, Recruit, Projects, People, Analytics, Sigma, Deluge) é uma combinação incomum no Brasil. O cliente não precisa de três fornecedores (Zoho + integração + cloud) — tem uma só agência sênior. Isso justifica preço **acima** do parceiro Zoho típico e do dev freelancer comum.
2. **Vender ROI, não horas de configuração.** O mercado ancora "implementação de CRM" em valores baixos (RD Station R$849–1.999) porque o SaaS nacional empacota onboarding. O valor da Sparamer está na customização, integração e automação que geram retorno — a conversa é sempre sobre horas economizadas / receita destravada.
3. **Edge multilíngue / cross-border.** PT/ES/EN/SV/FR + vivência LatAm (Venezuela/Brasil) e Europa (Suécia). Para o alvo brasileiro, é sinal de senioridade e capacidade de atender empresas com matriz/operação na América Latina e Europa. Também abre uma **trilha de exportação** (ver §5).
4. **Equipe enxuta e sênior, não "freela de plataforma".** Dois sócios — Luis (arquiteto de soluções) e David Gamboa (eng. da computação; bancos de dados, ERP e sistemas sob medida). Proteger a capacidade: limitar projetos simultâneos, prazos honestos, precificar a escassez.

---

## 2. Modelo comercial: diagnóstico → projeto → operação

A estrutura já existe no site (seção *Método*). Agora ela ganha preço:

```
Diagnóstico  →  Implementação  →  Operação
(entrada, pago)  (projeto fixo)    (retainer R$/mês)
```

**Sempre abrir pelo Diagnóstico pago.** "Todo projeto começa por um diagnóstico." O diagnóstico online grátis de 3 perguntas continua sendo o **qualificador de lead**; o diagnóstico aprofundado é **pago e creditável** no projeto. Cobrar (a) filtra curiosos, (b) remunera a auditoria real, (c) reduz risco de escopo, (d) ancora o valor da implementação. O crédito remove o atrito de compra mantendo o compromisso.

Régua de mercado para discovery pago: **8–15% do valor do projeto** (Mind Consulting, R$18–35k para projetos até R$200k — *alta confiança*). Escalado para o alvo PME.

---

## 3. Âncoras de tarifa (com o piso tributário)

| Métrica | Piso | Alvo (mid) | Premium | Observação |
|---|---|---|---|---|
| **Hora** | R$180 | **R$280** | R$400 | Hora avulsa é exceção — o produto é o pacote |
| **Diária** | R$1.400 | R$2.100 | R$3.000 | 8h com desconto de volume (inferido) |
| **Retainer** | R$3.500/mês | R$9.000/mês | R$20.000/mês | Bucket part-time → gestão dedicada |
| **Exportação (USD/EUR)** | — | — | **R$311–518/h** | Clientes US/EU — caixa premium (§5) |

**Por que R$180 é o piso, não menos.** PJ sênior ganha ~R$19.474/mês (Codigo Fonte TV, n=3.089 — *alta*); Python PJ R$17–26k e DevOps/Cloud PJ R$20–30k (HuntIT 2026). Em ~160h/mês isso exige ~R$106–162/h **só para empatar**, antes de impostos, ociosidade e ausência de benefícios. A hora mínima defensável é R$180; o alvo é R$280 (stack raro), com R$400 reservado para escopo premium/cross-border. Consultoria DevOps publicada já está em R$270–360/h (Infinite Cloud — *alta*).

**Piso tributário (crítico).** MEI (teto R$81k/ano) é **inviável** para a renda-alvo → usar **ME no Simples Nacional**. Tecnologia cai por padrão no **Anexo V (15,5% inicial)**; pagar pró-labore suficiente para manter **Fator R ≥ 28%** migra para o **Anexo III (6% inicial)** — ~9,5 pontos de diferença no líquido. Provisionar ~6–8% efetivo + contabilidade R$150–350/mês + reserva de benefícios próprios (FGTS-equiv., 13º, férias). **Não precificar abaixo do piso que cobre isso.**

---

## 4. Catálogo de serviços (5 frentes × 3 níveis)

### 4.1 Diagnóstico de Automação — *porta de entrada, pago e creditável*

| Nível | Preço | Prazo | Para quem |
|---|---|---|---|
| Express | **R$2.500–4.500** | 3–5 dias úteis | PME pequena, 1 processo. 100% creditável (≤45 dias) |
| Estratégico | **R$6.000–12.000** | 2–3 semanas | Scale-up / múltiplas áreas. Até 50% creditável |
| Arquitetura Cloud+Zoho | **R$15.000–30.000** | 3–4 semanas | Integração Zoho+GCP / dados. Até 50% creditável |

*Entrega: relatório, mapa as-is→to-be, roadmap faseado com ROI, proposta de escopo/orçamento.*

### 4.2 Zoho Ecosystem — Implementação & Configuração *(oferta líder)*

| Nível | Preço | Prazo | Escopo |
|---|---|---|---|
| Módulo Único | **R$6.000–18.000** | 2–4 sem | 1 módulo (ex.: CRM): setup, migração, até 5 automações, treino, 30d suporte |
| Multi-Módulo Integrado | **R$30.000–80.000** | 6–10 sem | 2–4 módulos conectados + Deluge + dashboards Analytics, 60d suporte |
| Programa Zoho One | **R$90.000–155.000** | 10–16 sem | Multi-módulo amplo + integrações externas (ERP, GCP) + governança, 90d hypercare |

*Ancora: Maxwize (basic USD 1–5k, medium USD 3–25k+, enterprise USD 50–150k+); ajustado à realidade PME-BR. Confiança baixa — validar.*

### 4.3 Integrações & Automações *(stack raro: Python + Deluge + GCP)*

| Nível | Preço | Prazo | Escopo |
|---|---|---|---|
| Automação Pontual | **R$3.000–9.000** | 1–2 sem | 1 webhook/função Deluge/sync simples, com logs e garantia 15d |
| Integração de Sistemas | **R$15.000–50.000** | 3–6 sem | Zoho ↔ externo (ERP/e-commerce/gateway/API) bidirecional, middleware Python |
| Plataforma / Sigma Widget | **R$50.000–150.000** | 6–12 sem | Extensão Sigma ou plataforma multi-sistema, backend Cloud Run + Cloud SQL, CI/CD |

*Ancora: B2Bit "cada integração R$5–50k" (média); Maxwize custom dev/API. Sigma = inferência (sem preço publicado globalmente).*

### 4.4 Cloud / GCP — Arquitetura & Migração *(nova frente — hoje escondida em "Integrações")*

| Nível | Preço | Prazo | Escopo |
|---|---|---|---|
| Setup Cloud Enxuto | **R$10.000–25.000** | 4–8 sem | GCP básico (Cloud Run + Cloud SQL + Storage), IaC, Cloud Build, 1 app |
| Migração para Nuvem | **R$25.000–55.000** | 8–12 sem | on-prem/outra cloud → GCP, observabilidade, otimização de custo |
| Arquitetura Híbrida Cloud+Zoho | **R$55.000–80.000** | 12–16 sem | GCP ↔ Zoho + ETL/Analytics, IaC, governança, 90d hypercare |

*Ancora: Forja de Sistemas — migração R$10–80k + recorrente R$500–8k/mês (alta confiança).*

### 4.5 Discord & Comunidades — community-ops *(nicho diferenciador)*

| Nível | Preço | Prazo | Escopo |
|---|---|---|---|
| Bot Customizado | **R$3.000–8.000** | 1–3 sem | Bot Python (comandos, moderação, 1 integração), hospedado em Cloud Run |
| Discord ↔ Zoho/CRM | **R$10.000–25.000** | 3–5 sem | Sync de membros/eventos/leads + automações + dashboards |
| Operação de Comunidade | **R$3.000–12.000/mês** | recorrente (mín. 3 meses) | Evolução de bots, monitoramento, 10–30h/mês, relatório mensal |

*Evitar o piso commodity doméstico (R$20–300); ancorado em build custom global (Fiverr) + integração ao stack.*

---

## 5. Trilha de exportação (opcional, alavanca o multilíngue)

Faturar clientes US/EU em USD/EUR a **R$311–518/h** (tier offshore sênior — Maxwize, USD 60–100/h @ USD/BRL 5,18). O prêmio multilíngue cross-border verificado é **+50–100%** (FluentCap/Payoneer). Caixa premium que **subsidia preços competitivos no Brasil**. Usar como diferencial real — não inflar o preço doméstico. Revisar câmbio trimestralmente (USD/BRL ~5,18; EUR/BRL ~5,95 — jun/2026).

---

## 6. Riscos & guardrails

1. **Subprecificação** — a mediana real de plataforma é bem menor (Python doméstico R$50–150/h). As faixas altas refletem o cliente **bem posicionado/direto**, não a mediana. Mitigar: liderar com pacotes (esconde a hora), cobrar diagnóstico, falar em ROI.
2. **Scope creep** — diagnóstico pago define escopo ANTES; contrato com change-request explícito; hypercare com prazo (30/60/90d); horas extras à hora cheia.
3. **Dados Zoho/BR triangulados** — nenhum parceiro (CRM7, Delab, WebPeak) ou plataforma (Workana, 99freelas) publica preço. Validar com 3–5 cotações reais e ajustar.
4. **Capacidade da equipe** — limitar projetos concorrentes; subcontratar pontualmente sem quebrar a voz da agência.
5. **Pejotização (Tema 1389 STF)** — o modelo multi-cliente por projeto/retainer é a proteção; evitar dependência de cliente único disfarçada de PJ.
6. **Câmbio** — faixas de export dependem do dólar; revisar trimestralmente.

---

## 7. O que muda no site (lista de implementação)

| # | Arquivo | Mudança |
|---|---|---|
| 1 | `components/sections/ServicosSection.tsx` | Promover **Cloud/GCP** a 4ª frente; trocar chips `cloudflare·railway·supabase` → **GCP (Cloud Run, Cloud SQL, Cloud Build, Storage)** + python/deluge |
| 2 | **nova** seção/página `precos` (ou âncora em Serviços) | Tabela de preços por frente × nível — cumpre a promessa "preço transparente" que já está no copy |
| 3 | `lib/metodo.ts` | Anexar investimento a cada fase (Diagnóstico pago/creditável; faixas de projeto; retainer) |
| 4 | `app/sobre/page.tsx` | Reescrever bio do Luis (LinkedIn); preencher David Gamboa (DB/ERP/sistemas sob medida); manter "agência"; "São Paulo · remoto do Rio" |
| 5 | `lib/seo.ts` | Padronizar e-mail **contato@sparamer.com**; **remover** `phone`/`whatsappUrl` e `telephone` do JSON-LD; manter "agência" |
| 6 | `app/contato/page.tsx` | **Remover** card WhatsApp + `tel:` (número roubado); e-mail + formulário como canais principais; idiomas PT·ES·EN·SV·FR |
| 7 | `components/sections/CTAForm.tsx` / `components/Footer.tsx` | E-mail único `contato@sparamer.com`; sem telefone |
| 8 | `app/consulta` + `Diagnostico.tsx` | Posicionar como diagnóstico **grátis de qualificação**; CTA para o diagnóstico pago |

---

## 8. Decisões em aberto para você

1. **Página de preços vs. anexo em Serviços** — preferir `/precos` dedicada (melhor p/ SEO e clareza) ou faixas dentro da seção Serviços?
2. **Faixa pública** — mostrar faixas ("a partir de R$X"), só "sob consulta", ou faixa + diagnóstico? (Recomendo **"a partir de R$X" + diagnóstico** — transparência sem travar negociação.)
3. **Trilha de exportação** — exibir no site (atrai clientes US/EU) ou manter como oferta de bastidores?
4. **Diagnóstico pago** — confirma cobrar a partir de R$2.500 creditável? (Recomendado.)
5. **Postura de preço** — usar o **mid** como padrão público (recomendado), ou abrir no piso para ganhar tração inicial?
