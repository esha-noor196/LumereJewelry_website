import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { StoreProvider } from "@/lib/store";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="eyebrow">Error 404</div>
        <h1 className="mt-4 font-serif text-5xl md:text-6xl">Page not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you're looking for has been moved or no longer exists.
        </p>
        <div className="mt-8">
          <Link to="/" className="btn-luxe">Return home</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="eyebrow">Something went wrong</div>
        <h1 className="mt-4 font-serif text-4xl">This page didn't load</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          You can try refreshing or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-luxe"
          >
            Try again
          </button>
          <a href="/" className="btn-luxe-outline">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lumière Jewelry — Fine Jewelry, Made to Last" },
      {
        name: "description",
        content:
          "Discover Lumière — fine rings, necklaces, earrings and bracelets in 18k gold and ethically-sourced diamonds. Complimentary shipping over €200.",
      },
      { name: "author", content: "Lumière Jewelry" },
      { property: "og:site_name", content: "Lumière Jewelry" },
      { property: "og:title", content: "Lumière Jewelry — Fine Jewelry, Made to Last" },
      {
        property: "og:description",
        content:
          "Discover Lumière — fine rings, necklaces, earrings and bracelets in 18k gold and ethically-sourced diamonds. Complimentary shipping over €200.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Lumière Jewelry — Fine Jewelry, Made to Last" },
      { name: "twitter:description", content: "Discover Lumière — fine rings, necklaces, earrings and bracelets in 18k gold and ethically-sourced diamonds. Complimentary shipping over €200." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/17d6389c-b2ef-4bb2-8b2e-3bfde40d6c66" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/17d6389c-b2ef-4bb2-8b2e-3bfde40d6c66" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&family=Poppins:wght@300;400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <Outlet />
      </StoreProvider>
    </QueryClientProvider>
  );
}
