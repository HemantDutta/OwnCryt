import { Outlet } from "react-router-dom";
import { AnnouncementBar } from "./AnnouncementBar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { InterestModal } from "../interest/InterestModal";
import styles from "./Layout.module.css";

export function Layout() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <AnnouncementBar />
      <Header />
      <main id="main" className={styles.main}>
        <Outlet />
      </main>
      <Footer />
      <InterestModal />
    </>
  );
}
