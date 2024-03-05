import { IconTrees } from "@tabler/icons-react";
import { Book } from "../types";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { addToPlaylist } from "../hooks/playlist";

interface CardProps {
  book: Book;
  onOpenModal: () => void;
}

export function Card({ book, onOpenModal }: CardProps) {
  const cover = book.key.split("/")[2];

  let subjects;
  if (book && book.subjects) {
    subjects = book.subjects
      .map((subject, index) => (
        <div key={index} className={styles.featureItem}>
          <IconTrees size="1.05rem" className={styles.icon} stroke={1.5} />
          <p>{subject}</p>
        </div>
      ))
      .slice(0, 2);
  }

  const handleAddToPlaylist = () => {
    addToPlaylist(book.key, "Playlist 1");
    alert("Le livre a été ajouté à la playlist !");
  };

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

          <p>Kind : {book.kind}</p>
        </div>
        <div className={styles.containerBtn}>
          <button className={styles.button} onClick={onOpenModal}>
            Ouvrir la modal
          </button>
          <button className={styles.button} onClick={handleAddToPlaylist}>
            Ajouter à la playlist
          </button>
        </div>
      </div>
    </>
  );
}
