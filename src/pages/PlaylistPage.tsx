import { getPlaylists } from "../hooks/playlist";
import styles from "./PlaylistPage.module.css";

export default function PlaylistPage() {
  const playlists = getPlaylists();

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1>Mes Playlists</h1>
        <div className={styles.playlist}>
          {Object.values(playlists).map((playlist, index) => (
            <div key={index}>
              <p>{playlist.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
