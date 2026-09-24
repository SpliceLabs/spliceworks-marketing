import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ParallaxProvider } from "@/providers/ParallaxProvider";
import styles from "./layout.module.css";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ParallaxProvider>
      <div className={styles.layout}>
        <Header />
        <main id="main-content" className={styles.main}>
          {children}
        </main>
        <Footer />
      </div>
    </ParallaxProvider>
  );
}
