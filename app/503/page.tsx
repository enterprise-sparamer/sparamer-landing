import type { Metadata } from "next";
import { ErrorPage } from "@/components/ui/ErrorPage";

export const metadata: Metadata = {
  title: "Em manutenção",
  description: "Estamos atualizando o sistema. Volte em alguns minutos.",
  robots: { index: false, follow: false },
};

export default function ServiceUnavailable() {
  return (
    <ErrorPage
      code="503"
      title="Estamos em manutenção."
      body="Estamos publicando uma atualização rápida. Volte em alguns minutos — essas janelas costumam durar menos de 10 min."
    />
  );
}
