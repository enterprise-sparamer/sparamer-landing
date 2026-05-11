import type { Metadata } from "next";
import { ErrorPage } from "@/components/ui/ErrorPage";

export const metadata: Metadata = {
  title: "Página não encontrada",
  description: "A rota solicitada não existe na Sparamer.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <ErrorPage
      code="404"
      title="Não encontramos esta página."
      body="O endereço que você acessou não existe ou foi movido. Confira a URL ou volte para a página inicial — vamos te ajudar a encontrar o caminho."
    />
  );
}
