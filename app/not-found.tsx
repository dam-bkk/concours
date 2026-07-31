import Link from "next/link";
import { LaureatLogo } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="card-pop mx-auto mt-10 max-w-md p-8 text-center rise">
      <div className="mx-auto w-fit">
        <LaureatLogo size={64} />
      </div>
      <h1 className="mt-4 font-display text-3xl font-extrabold">Oups, page introuvable</h1>
      <p className="mt-2 font-semibold text-muted">
        Cette page n&apos;existe pas… mais les maths, elles, t&apos;attendent !
      </p>
      <Link href="/" className="btn-pop mt-6 inline-block bg-ink px-6 py-3 font-extrabold text-white">
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
