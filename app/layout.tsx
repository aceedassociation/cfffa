import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cluster-faa.anassboufi1999.chatgpt.site"),
  title: "Cluster des Filières Agricoles Africaines",
  description:
    "Le Cluster Filière Fromage-Agro fédère les acteurs des filières agricoles et valorise leurs produits.",
  openGraph: {
    title: "Cluster Filière Fromage-Agro",
    description:
      "Savoir-faire, qualité et valorisation des produits des filières agricoles.",
    url: "https://cluster-faa.anassboufi1999.chatgpt.site",
    siteName: "CFFA",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://cluster-faa.anassboufi1999.chatgpt.site/og.png",
        width: 1200,
        height: 630,
        alt: "Cluster Filière Fromage-Agro — CFFA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cluster Filière Fromage-Agro",
    description:
      "Savoir-faire, qualité et valorisation des produits des filières agricoles.",
    images: ["https://cluster-faa.anassboufi1999.chatgpt.site/og.png"],
  },
  icons: {
    icon: "/legacy/assets/img/logo-cffa.jpg",
    shortcut: "/legacy/assets/img/logo-cffa.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
