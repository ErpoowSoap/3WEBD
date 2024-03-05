import { useState } from "react";
import styles from "./Modal.module.css";
import { addPlaylist, addToPlaylist, getPlaylists } from "../hooks/playlist";
import { PlaylistItem_Content } from "../types";

interface ModalComponentProps {
  onClose: () => void;
  bookId: string;
}

export function ModalComponent({ onClose, bookId }: ModalComponentProps) {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [selectedPlaylistIndexes, setSelectedPlaylistIndexes] = useState<
    number[]
  >([]);

  const playlists = getPlaylists();

  const handleAddToPlaylist = (event: React.FormEvent) => {
    event.preventDefault();

    selectedPlaylistIndexes.forEach((index) => {
      const contentToAdd: PlaylistItem_Content = {
        id: index,
        bookId: bookId,
      };
      addToPlaylist(contentToAdd);
    });

    setSelectedPlaylistIndexes([]);
    alert("Les livres ont été ajoutés à la playlist !");
  };

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <div className={styles.closeButton}>
          <button onClick={onClose}>X</button>
        </div>
        <div className={styles.title}>
          <h2>Ajouter à ma ReadList</h2>
          <p>{bookId}</p>
        </div>
        <div className={styles.container}>
          <div className={styles.list}>
            <form onSubmit={handleAddToPlaylist}>
              <h3>Ajouter à la playlist :</h3>
              {playlists.map((playlist, index) => (
                <div key={index}>
                  <label>
                    <input
                      type="checkbox"
                      value={index}
                      checked={selectedPlaylistIndexes.includes(index)}
                      onChange={(e) => {
                        const index = parseInt(e.target.value, 10);
                        setSelectedPlaylistIndexes((prevIndexes) =>
                          prevIndexes.includes(index)
                            ? prevIndexes.filter(
                                (prevIndex) => prevIndex !== index
                              )
                            : [...prevIndexes, index]
                        );
                      }}
                    />
                    {playlist.name}
                  </label>
                </div>
              ))}
              
              <button type="submit">Ajouter à la playlist</button>
            </form>
          </div>
        </div>
        <div className={styles.createPlaylistForm}>
          <input
            type="text"
            placeholder="Nom de la playlist"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <button
            onClick={() =>
              addPlaylist({
                name: newPlaylistName,
              })
            }
          >
            Créer Playlist
          </button>
        </div>
      </div>
    </div>
  );
}
