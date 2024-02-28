import { useRecentChanges } from "../hooks/book";
import styles from "./HomePage.module.css";
import { PaginationPage } from "../component/Pagination";
import { BookCard } from "../component/BookCard";
//import { BookCard } from "../component/BookCard";

export default function HomePage() {
  const bookQuery = useRecentChanges();

  if (bookQuery.isLoading) {
    return (
      <div className={styles.test1}>
        <p className={styles.loading}>Chargement</p>
      </div>
    );
  }

  const { data: movies } = bookQuery;
  if (bookQuery.isError || !movies) {
    return (
      <div>
        <p>Erreur au chargement</p>
        <button type="button" onClick={() => bookQuery.refetch()}>
          Recharger
        </button>
      </div>
    );
  }

  return (
    <>
      <div className={styles.root}>
        <div className={styles.container}>
          {movies.slice(0, 12).map((movie) => (
            <BookCard key={movie.title} book={movie} />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "20px",
          }}
        >
          <PaginationPage />
        </div>
      </div>
    </>
  );
}
