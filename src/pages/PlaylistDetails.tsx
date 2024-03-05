import { useParams } from "react-router-dom";
import { getPlaylistItems } from "../hooks/playlist";
import styles from "./PlaylistDetails.module.css";
import { useBooksInPlaylist } from "../hooks/book";
import { Loading } from "../component/Loading";
import { Card } from "../component/Card";

export default function PlaylistDetails() {
  const { playlistId } = useParams();
  if (!playlistId || playlistId === undefined) {
    return <div>Playlist not found</div>;
  }
  const playlists = getPlaylistItems(parseInt(playlistId)).map(
    (item) => item.bookId
  );
  const booksQuery = useBooksInPlaylist(playlists);

  if (booksQuery.isLoading) {
    return <Loading />;
  }

  const { data: book } = booksQuery;
  if (booksQuery.isError || !book) {
    return <div>Book not found</div>;
  }
  console.log(book);
  const handleOpenModal = () => {};

  return (
    <>
      <div className={styles.title}>
        <h2>Mes Playlists</h2>
      </div>
      <div className={styles.playlist}>
        <div className={styles.root}>
          <div className={styles.container}>
            {book.map((book) => (
              <Card
                key={book.title}
                book={book}
                onOpenModal={handleOpenModal}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
