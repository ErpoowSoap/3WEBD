import { IconHeart, IconManualGearbox, IconTrees } from "@tabler/icons-react";
import { Book } from "../types";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";

interface CardProps {
  book: Book;
}

const mockdata = [
  { label: "Romance", icon: IconHeart },
  { label: "Aventure", icon: IconTrees },
  { label: "Automatic", icon: IconManualGearbox },
  // { label: "Electric", icon: IconGasStation },
];

export function Card(props: CardProps) {
  const { book } = props;
  const covert = book.key.split("/")[2];
  // const author = book.authors[0].key.split("/")[2];
  // let author;
  // if (book.authors && book.authors[0] && book.authors[0].key) {
  //   author = book.authors[0].key.split("/")[2];
  // } else {
  //   author = 'OL233814A'; 
  // }

  const features = mockdata.map((feature, index) => (
    <div key={index} className={styles.featureItem}>
      <feature.icon size="1.05rem" className={styles.icon} stroke={1.5} />
      <p>{feature.label}</p>
    </div>
  ));

  return (
    <div className={styles.card}>
      <Link
        to={`/detail/`}
        className={styles.movieCard}
      >
        <div className={styles.imageSection}>
          <h4>{book.title}</h4>
          <img
            src={`https://covers.openlibrary.org/b/olid/${covert}-L.jpg`}
            alt="Cover book"
          />
        </div>
        <div className={styles.section}>
          <p className={styles.label}>Thèmes :</p>
          <div className={styles.features}>{features}</div>
          <p>Description : {book.publishers[0]}</p>
        </div>
      </Link>
    </div>
  );
}
