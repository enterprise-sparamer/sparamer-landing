"use client";

import { useEffect } from "react";
import { ErrorPage } from "@/components/ui/ErrorPage";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (typeof console !== "undefined") {
      console.error(error);
    }
  }, [error]);

  return (
    <ErrorPage
      code="500"
      title="Algo deu errado por aqui."
      body="Um erro inesperado interrompeu esta página. Nosso time já foi notificado — você pode tentar novamente em alguns segundos ou voltar para o início."
      requestId={error.digest}
    />
  );
}
