// import { IconTrees } from "@tabler/icons-react";
import { IconHeart } from "@tabler/icons-react";
import { Book } from "../types";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";

interface CardProps {
  book: Book;
  onOpenModal: (bookId: string) => void;
}

export function Card({ book, onOpenModal }: CardProps) {
  const cover = book.key.split("/")[2];
  // const bookId = book.key;

  let subjects;
  // if (book && book.subjects) {
  //   subjects = book.subjects
  //     .map((subject, index) => (
  //       <div key={index} className={styles.featureItem}>
  //         <IconTrees size="1.05rem" className={styles.icon} stroke={1.5} />
  //         <p>{subject}</p>
  //       </div>
  //     ))
  //     .slice(0, 2);
  // }

  return (
    <>
      <div className={styles.card}>
        <div className={styles.imageSection}>
          <div className={styles.back}>
            <Link to={`/details/${cover}`} className={styles.movieCard}>
              <div className={styles.title}>
                <h4>{book.title}</h4>
              </div>
              <img
                src={`https://covers.openlibrary.org/b/olid/${cover}-L.jpg`}
                alt="Cover book"
              />
            </Link>
          </div>
        </div>
        <div className={styles.section}>
          {subjects && (
            <>
              <p className={styles.label}>Thèmes :</p>
              <div className={styles.features}>{subjects}</div>
            </>
          )}
          <p>Editeur : {book.editeur}</p>
          <p>Kind : {book.kind}</p>
        </div>
        <div className={styles.containerBtn}>
          <button
            className={styles.button}
            onClick={() => onOpenModal(book.key)}
          >
            <IconHeart size="1.5rem" className={styles.icon} stroke={2} />
          </button>
        </div>
      </div>
    </>
  );
}
