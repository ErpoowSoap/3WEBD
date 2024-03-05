import { IconHeart } from "@tabler/icons-react";
import { Book } from "../types";
import styles from "./PlaylistCard.module.css";
import { Link } from "react-router-dom";
import { ActionIcon, Group } from "@mantine/core";

interface CardProps {
  book: Book;
}

export function PlaylistCard({ book}: CardProps) {
  const cover = book.key.split("/")[2];

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
          <p></p>
        </div>
        <div className={styles.containerBtn}>
          <Group justify="center">
            <ActionIcon
              variant="default"
              size="xl"
            >
              <IconHeart size="1.5rem" className={styles.icon} stroke={1.5} />
            </ActionIcon>
          </Group>
        </div>
      </div>
    </>
  );
}
