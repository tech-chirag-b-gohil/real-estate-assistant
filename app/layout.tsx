import "./globals.css";
import { Roboto } from "next/font/google"
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navigation/navbar";
import LeftPane from "@/components/navigation/left-pane";
import StoreProvider from "@/redux/store-provider";
import { ThemeToggler } from "@/components/theme/theme-toggler";

export const metadata = {
  title: "Real Estate Assistant",
  description:
    "Your AI-powered assistant for real estate inquiries and property analysis.",
};

const roboto = Roboto({ 
  weight: ["400", "500", "700"],
  subsets: ["latin"]
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className={cn(roboto.className, "antialiased dark")}>
        <StoreProvider>
          <Toaster position="top-center" richColors />
          <ThemeToggler />
          <div className="flex flex-row h-dvh">
            {/* Left Pane */}
            <LeftPane />
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              <Navbar />
              {children}
            </div>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
