// HomePage.tsx
import { useState } from "react";
import { Card } from "../component/Card";
import { Loading } from "../component/Loading";
import { ModalComponent } from "../component/Modal";
import { PaginationPage } from "../component/Pagination";
import { useRecentChanges } from "../hooks/book";
import { ModalPortal } from "../portal/ModalPortal";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const bookQuery = useRecentChanges();
  const [activePage, setActivePage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookId, setBookId] = useState("");

  const handleOpenModal = (bookId: string) => {
    setIsModalOpen(true);
    setBookId(bookId);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

  const itemsPerPage = 20;
  const totalPages = Math.ceil(books.length / itemsPerPage);
  const startIndex = (activePage - 1) * itemsPerPage;
  const itemsToShow = books.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <div className={styles.root}>
        <div className={styles.title}>
          <h1>Recent Changes</h1>
        </div>
        <div className={styles.container}>
          {itemsToShow.map((book) => (
            <Card key={book.key} book={book} onOpenModal={handleOpenModal} />
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
      <ModalPortal>
        {isModalOpen && (
          <ModalComponent onClose={handleCloseModal} bookId={bookId} />
        )}
      </ModalPortal>
    </>
  );
}
