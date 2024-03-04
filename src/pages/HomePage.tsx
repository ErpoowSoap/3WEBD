import { Card } from "../component/Card";
import { Loading } from "../component/Loading";
import { PaginationPage } from "../component/Pagination";
import { useRecentChanges } from "../hooks/book";
import styles from "./HomePage.module.css";
import { useState } from "react";

export default function HomePage() {
  const bookQuery = useRecentChanges()
  const [activePage, setActivePage] = useState(1);

  if (bookQuery.isLoading) {
    return <Loading />;
  }

  const { data: books } = bookQuery;
  if (bookQuery.isError || !books) {
    return (
      <div>
        <p>Erreur au chargement</p>
        <button type="button" onClick={() => bookQuery.refetch()}>
          Recharger
        </button>
      </div>
    );
  }

  const itemsPerPage = 12;
  const totalPages = Math.ceil(books.length / itemsPerPage);
  const startIndex = (activePage - 1) * itemsPerPage;
  const itemsToShow = books.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <div className={styles.root}>
        <div className={styles.container}>
          {itemsToShow.map((book) => (
            <Card key={book.title} book={book} />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "20px",
          }}
        >
          <PaginationPage
            total={totalPages}
            activePage={activePage}
            onChange={setActivePage}
          />
        </div>
      </div>
    </>
  );
}
