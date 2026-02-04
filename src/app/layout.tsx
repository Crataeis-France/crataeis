import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { headers } from "next/headers";
// Styles
import "./globals.scss";
// components
import { ThemeProvider } from "@/components/ThemeProvider";
// i18n
import { routing } from "@/i18n/routing";

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-sans-tech",
  subsets: ["latin"],
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono-tech",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const locale = headersList.get("x-next-intl-locale") ?? routing.defaultLocale;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
