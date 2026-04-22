import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AI Adoption Framework" },
      { name: "description", content: "Interactive AI project assessment tool built on the PMI CPMAI framework." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "AI Adoption Framework" },
      { property: "og:description", content: "Interactive AI project assessment tool built on the PMI CPMAI framework." },
      { name: "twitter:title", content: "AI Adoption Framework" },
      { name: "twitter:description", content: "Interactive AI project assessment tool built on the PMI CPMAI framework." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2e1748f0-ba26-4d51-bd61-50d3df0d6864/id-preview-b076c5cc--61395cdd-57e6-4479-b5de-a33586780b65.lovable.app-1776859665849.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2e1748f0-ba26-4d51-bd61-50d3df0d6864/id-preview-b076c5cc--61395cdd-57e6-4479-b5de-a33586780b65.lovable.app-1776859665849.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
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
  return (
    <Outlet />
  );
}
