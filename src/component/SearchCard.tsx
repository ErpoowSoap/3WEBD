// import { IconTrees } from "@tabler/icons-react";
import { AdvancedSearch} from "../types";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";

interface SearchCardProps {
  book: AdvancedSearch;
}

export function SearchCard(props: SearchCardProps) {
  const { book } = props;
  const bookId = book.key.split("/")[2];
  const cover = book.cover_i;
  console.log(book.cover_i);


  return (
      <>
        <div className={styles.card}>
          <div className={styles.imageSection}>
            <div className={styles.back}>
              <Link to={`/details/${bookId}`} className={styles.movieCard}>
                <div className={styles.title}>
                  <h4>{book.title}</h4>
                </div>
                <img
                    src={`https://covers.openlibrary.org/b/id/${cover}-L.jpg`}
                    alt="Cover book"
                />
              </Link>
            </div>
          </div>
          <div className={styles.section}>
            <p>Auteur : {book.author_name}</p>
            <p>Année de première publication : {book.first_publish_year}</p>
          </div>
        </div>
      </>
  );
}
