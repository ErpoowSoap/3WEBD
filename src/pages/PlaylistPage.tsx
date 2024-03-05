import { ProfileReadList } from "../component/ProfileReadList";
import { getPlaylists } from "../hooks/playlist";
import styles from "./PlaylistPage.module.css";
import { Link } from "react-router-dom";

export default function PlaylistPage() {
  const playlists = getPlaylists();

  return (
    <>
      <div className={styles.root}>
        <div className={styles.title}>
          <h1>Mes ReadLists</h1>
        </div>
        <div className={styles.container}>
          {playlists.map((playlist, index) => (
            <Link key={index} to={`/playlist/details/${index}`}>
              <div>
                <ProfileReadList key={index} playlist={playlist} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
