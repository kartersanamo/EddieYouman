import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 pt-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-teal">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl font-bold text-forest">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-slate/70">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-lg bg-teal px-6 py-3 text-sm font-semibold text-white hover:bg-teal-light"
        >
          Go home
        </Link>
        <Link
          href="/book"
          className="rounded-lg border border-slate/20 bg-white px-6 py-3 text-sm font-semibold text-forest hover:border-teal/40"
        >
          Request a quote
        </Link>
        <Link
          href="/contact"
          className="rounded-lg border border-slate/20 bg-white px-6 py-3 text-sm font-semibold text-forest hover:border-teal/40"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}
