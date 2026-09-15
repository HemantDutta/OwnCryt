import { Link } from "react-router-dom";
import styles from "./AnnouncementBar.module.css";

export function AnnouncementBar() {
  return (
    <p className={styles.bar}>
      The first OwnCryt collection is taking shape —{" "}
      <Link to="/collection">discover the edit</Link>
    </p>
  );
}
