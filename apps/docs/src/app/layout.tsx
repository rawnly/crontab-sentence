import Providers from "./components/Providers";
import "@/tailwind.css";

export const metadata = {
  title: {
    default: "Sentence to Cron | Home",
    template: ' "Sentence to Cron | %s"',
  },
  themeColor: "#000",
  description: "Natural language to cron expression",
  twitter: {
    site: "https://sentencetocron.fedevitale.dev",
    card: "summary",
    title: "Sentence to Cron | %s",
    description: "Natural language to cron expression",
    creator: "@fedevitaledev",
  },
  openGraph: {
    title: "Sentence to Cron",
    description: "Convert a sentence to a cron expression",
    locale: "en_US",
    url: "https://sentencetocron.fedevitale.dev",
    siteName: "Sentence to Cron",
    images: [
      {
        url: "https://sentencetocron.fedevitale.dev/assets/banner-dark.png",
        type: "image/png",
        alt: "Dark Banner",
      },
      {
        url: "https://sentencetocron.fedevitale.dev/assets/banner-light.png",
        type: "image/png",
        alt: "Light Banner",
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
