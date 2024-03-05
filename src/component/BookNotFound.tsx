import styles from "./BookNotFound.module.css";

export function BookNotFound() {
  return (
    <>
      <section className={styles.page_404}>
        <div className={styles.container}>
          <h1 className={styles.title}>404</h1>
          <div className={styles.four_zero_four_bg}></div>
          <div className={styles.contant_box_404}>
            <h3>Look like you're lost</h3>
          </div>
        </div>
      </section>
    </>
  );
}
