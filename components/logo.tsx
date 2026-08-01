/**
 * Logo Admisio — marque minimaliste : un « A » sans traverse, dont la barre
 * horizontale est déplacée sous le sommet, comme un palier franchi.
 * Monochrome, sans dégradé ni relief : lisible de 20 px à 200 px.
 */

/** Compatibilité avec le moteur (accessoires non utilisés ici) */
export type Accessory = "aucun";

export function AdmisioLogo({ size = 32 }: { size?: number; accessory?: Accessory }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="var(--color-zest)" />
      {/* Le A : deux jambages */}
      <path
        d="M9 24 16 8l7 16"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Le palier franchi */}
      <path d="M12.2 17.6h7.6" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}
