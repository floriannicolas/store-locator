import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Génère un site statique (SSG)
  distDir: "dist",   // Dossier de sortie pour les fichiers statiques
  assetPrefix: "/",  // Pour gérer correctement les chemins relatifs
  trailingSlash: true // Pour ajouter un "/" à la fin des URLs et éviter les erreurs 404
};

export default nextConfig;
