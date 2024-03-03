import styles from "./Loading.module.css";


export function Loading() {
    return (
        <div className={styles.container}>
          <p className={styles.loading}>Chargement</p>
        </div>
      );
}