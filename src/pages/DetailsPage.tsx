import { useParams } from "react-router-dom";
import styles from "./DetailsPage.module.css";
import "./DetailsPage.module.css";
import { useAuthorById } from "../hooks/author";

export default function DetailsPage() {
  const { authorId } = useParams();
  
  if (!authorId || authorId === undefined) {
    return <p>Erreur lors du chargement</p>;
  }

  console.log("authorId", authorId);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const authorDetail = useAuthorById({authorId});
  
  if (authorDetail.isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <p className={styles.loading}>Chargement</p>
      </div>
    );
  }

  const { data: author } = authorDetail;
  if (authorDetail.isError || !author) {
    return (
      <div>
        <p>Erreur au chargement</p>
        <button type="button" onClick={() => authorDetail.refetch()}>
          Recharger
        </button>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.imageSection}>
          <h4>{author[0].name}</h4>
        </div>
        <div className={styles.section}>
          <p className={styles.label}>Nom complet :</p>
          <p>{author[0].fuller_name}</p>
          <p className={styles.label}>Date de naissance :</p>
          <p>{author[0].birth_date}</p>
          <p className={styles.label}>Date de décès :</p>
          <p>{author[0].death_date}</p>
          <p className={styles.label}>Biographie :</p>
          <p>{author[0].bio.value}</p>
        </div>
      </div>
    </div>
  );
}

