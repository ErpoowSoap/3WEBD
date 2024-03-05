import { useParams } from "react-router-dom";
import styles from "./DetailsPage.module.css";
import "./DetailsPage.module.css";
import { useDetailBook } from "../hooks/book";
import { IconHeart } from "@tabler/icons-react";
import { Loading } from "../component/Loading";

export default function DetailsPage() {
  const { bookId } = useParams();
  if (!bookId || bookId === undefined) {
    return <div>Book not found</div>;
  }
  const bookDetail = useDetailBook({ bookId });
  console.log(bookDetail);

  if (bookDetail.isLoading) {
    return <Loading />;
  }

  const { data: book } = bookDetail;
  if (bookDetail.isError || !book) {
    return <div>Book not found</div>;
  }
  const cover = book.workData.covers[0];

  let subjects;
  if (book && book.subjects) {
    subjects = book.subjects
      .map((subject, index) => (
        <div key={index} className={styles.featureItem}>
          <IconHeart size="1.05rem" className={styles.icon} stroke={1.5} />
          <p>{subject}</p>
        </div>
      ))
      .slice(0, 4);
  } else if (book && book.workData && book.workData.subjects) {
    subjects = book.workData.subjects
      .map((subject, index) => (
        <div key={index} className={styles.featureItem}>
          <IconHeart size="1.05rem" className={styles.icon} stroke={1.5} />
          <p>{subject}</p>
        </div>
      ))
      .slice(0, 4);
  }

  return (
    <>
      <div className={styles.root}>
        <div className={styles.containerImage}>
          <img
            src={`https://covers.openlibrary.org/b/id/${cover}-L.jpg`}
            alt="Cover book"
          />
        </div>
        <div className={styles.containerTexte}>
          <div className={styles.titleSection}>
            <h2>{book.workData.title}</h2>
          </div>
          <div className={styles.section}>
            {book.authorData ? (
              <>
                <p className={styles.label}>Auteur : {book.authorData.name}</p>
                {book.authorData.birth_date && (
                  <p className={styles.label}>
                    Date de naissance : {book.authorData.birth_date}
                  </p>
                )}
                {book.authorData.death_date && (
                  <p className={styles.label}>
                    Date de décès : {book.authorData.death_date}
                  </p>
                )}
                {book.authorData.bio && (
                  <p className={styles.label}>
                    Biographie :{" "}
                    {typeof book.authorData.bio === "string"
                      ? book.authorData.bio
                      : book.authorData.bio[0]?.value}
                  </p>
                )}
                {/* {book.authorData.bio.value && (
                <p className={styles.label}>Biographie : {book.authorData.bio.value}</p>
              )} */}
              </>
            ) : (
              <>
                <p className={styles.label}>Auteur : N'a pas été renseigné !</p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.containerBottom}>
        <div className={styles.section}>
          <h3 className={styles.label}>Détails du livre</h3>
          {book.publish_places && (
            <p className={styles.label}>
              Lieu de publication : {book.publish_places}
            </p>
          )}
          <p></p>
          {book.publish_date && (
            <p className={styles.label}>
              Date de publication : {book.publish_date}
            </p>
          )}
          <p></p>
          {book.workData.description && (
            <p className={styles.label}>
              Description :{" "}
              {typeof book.workData.description === "string"
                ? book.workData.description
                : book.workData.description.value}
            </p>
          )}
          {book.description && (
            <p className={styles.label}>
              Description :{" "}
              {typeof book.description === "string"
                ? book.description
                : book.description.value}
            </p>
          )}
          <div className={styles.features}>
            {subjects && (
              <>
                <p className={styles.label}>Sujets : </p>
                {subjects}
              </>
            )}
          </div>
          <p></p>
          {book.pagination && (
            <p className={styles.label}>Nombre de pages : {book.pagination}</p>
          )}
          <p></p>
          {book.physical_format && (
            <p className={styles.label}>
              Format physique : {book.physical_format}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
