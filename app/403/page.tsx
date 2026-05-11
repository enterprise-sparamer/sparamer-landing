import type { Metadata } from "next";
import { ErrorPage } from "@/components/ui/ErrorPage";

export const metadata: Metadata = {
  title: "Acesso restrito",
  description: "Você não tem permissão para acessar esta página.",
  robots: { index: false, follow: false },
};

export default function Forbidden() {
  return (
    <ErrorPage
      code="403"
      title="Esta página é restrita."
      body="Você não tem permissão para acessar este conteúdo. Se acredita que deveria ter acesso, é só falar com a gente que resolvemos rápido."
    />
  );
}
