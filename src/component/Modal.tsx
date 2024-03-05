import { useState } from "react";
import styles from "./Modal.module.css";
import { createPlaylist, getPlaylists } from "../hooks/playlist";
import { Checkbox, UnstyledButton } from "@mantine/core";

interface ModalComponentProps {
  onClose: () => void;
}

export function ModalComponent({ onClose }: ModalComponentProps) {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [value, onChange] = useState(true);
  const [addPlaylist, setAddPlaylist] = useState(false);
  const playlists = getPlaylists();
  console.log(playlists);

  const handleAddPlaylist = () => {
    setAddPlaylist(true);
  };

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim() !== "") {
      createPlaylist(newPlaylistName); 
      console.log(`La playlist "${newPlaylistName}" a été créée avec succès.`);
      setNewPlaylistName("");
    } else {
      console.log("Le nom de la playlist ne peut pas être vide.");
    }
  };

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <div className={styles.closeButton}>
          <button onClick={onClose}>X</button>
        </div>
        <div className={styles.title}>
          <h2>Ajouter à ma ReadList</h2>
        </div>
        <div className={styles.container}>
          <div className={styles.list}>
            {Object.values(playlists).map((playlist, index) => (
              <div key={index}>
                <UnstyledButton
                  onClick={() => onChange(!value)}
                  className={styles.buttonCheckBox}
                >
                  <Checkbox
                    checked={value}
                    onChange={() => {}}
                    tabIndex={-1}
                    size="md"
                    mr="xl"
                    aria-hidden
                  />
                  <p>{playlist.name}</p>
                </UnstyledButton>
              </div>
            ))}
          </div>
        </div>
        <a href="#" onClick={handleAddPlaylist}>
          Ajouter une nouvelle readlist
        </a>
          <div className={styles.createPlaylistForm}>
            <input
              type="text"
              placeholder="Nom de la playlist"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
            />
            <button onClick={handleCreatePlaylist}>Créer Playlist</button>
          </div>
      </div>
    </div>
  );
}
