import Providers from "./components/Providers";
import "@/tailwind.css";

const description = "Natural language to cron expression powered by GPT-3";
const title = "Sentence to Cron";

export const metadata = {
  title: {
    default: title,
    template: `${title} | %s`,
  },
  themeColor: "#000",
  description,
  twitter: {
    site: "https://crontab-ai.fedevitale.dev/",
    card: "summary",
    title,
    description,
    creator: "@fedevitaledev",
  },
  openGraph: {
    title: title,
    description,
    locale: "en_US",
    url: "https://crontab-ai.fedevitale.dev/",
    siteName: title,
    images: [
      {
        url: "/banner.png",
        type: "image/png",
        alt: "Dark Banner",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="selection:bg-primary-600 selection:text-white">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
