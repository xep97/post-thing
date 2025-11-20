import { Geist, Pacifico, Roboto, Chewy, Schoolbell, Orbitron, Cormorant_SC } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",

});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const chewy = Chewy({
  variable: "--font-chewy",
  subsets: ["latin"],
  weight: "400",
});

const schoolbell = Schoolbell({
  variable: "--font-schoolbell",
  subsets: ["latin"],
  weight: "400",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const oormorant_SC = Cormorant_SC({
  variable: "--font-cormorant_SC",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "TimePost",
  description: "Post something",
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' }
    ]
  }
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
