import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { ErrorFallback } from "../components/ErrorFallback";
import { NotFoundPage } from "./EditorialPage";

export function RouteErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFoundPage />;
  }

  if (error) {
    console.error("[route]", error);
  }

  return <ErrorFallback />;
}
