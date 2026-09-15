import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { InterestProvider } from "./context/InterestContext";
import { SavedProvider } from "./context/SavedContext";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { CollectionPage } from "./pages/CollectionPage";
import { ProductPage } from "./pages/ProductPage";
import {
  AboutPage,
  NotFoundPage,
  PrivacyPage,
  TermsPage,
} from "./pages/EditorialPage";
import { SearchPage } from "./pages/SearchPage";
import { SavedPage } from "./pages/SavedPage";
import { RouteErrorPage } from "./pages/RouteErrorPage";

const CustomStudioPage = lazy(() =>
  import("./pages/CustomStudioPage").then((m) => ({ default: m.CustomStudioPage })),
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        errorElement: <RouteErrorPage />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "collection", element: <CollectionPage /> },
          { path: "product/:slug", element: <ProductPage /> },
          {
            path: "custom-studio",
            element: (
              <Suspense fallback={<p style={{ padding: "3rem 1.25rem" }}>Loading studio…</p>}>
                <CustomStudioPage />
              </Suspense>
            ),
          },
          { path: "about", element: <AboutPage /> },
          { path: "privacy", element: <PrivacyPage /> },
          { path: "terms", element: <TermsPage /> },
          { path: "search", element: <SearchPage /> },
          { path: "saved", element: <SavedPage /> },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);

export function App() {
  return (
    <ErrorBoundary>
      <SavedProvider>
        <InterestProvider>
          <RouterProvider router={router} />
        </InterestProvider>
      </SavedProvider>
    </ErrorBoundary>
  );
}
