
export function addToPlaylist(bookKey: string, playlistName: string) {
  console.log("bookKey", bookKey);
  console.log("playlistName", playlistName);
  const playlists = getPlaylists();
  console.log("playlists", playlists);

  if (playlistName in playlists.name) {
    const playlist = playlists[playlistName];
    console.log("playlist", playlist);

    playlist.bookKeys.push(bookKey);
    playlists[playlistName] = playlist; // Mettre à jour la playlist dans l'objet playlists
    localStorage.setItem("playlists", JSON.stringify(playlists));
  } else {
    console.error(`La playlist "${playlistName}" n'existe pas.`);
  }
}

export function createPlaylist(playlistName: string) {
  const playlist = getPlaylists();
  if (!playlist[playlistName]) {
    playlist[playlistName] = { name: playlistName, bookKeys: [] };
    localStorage.setItem("NewPlaylist", JSON.stringify(playlist));
    return true;
  }
  return false;
}

// export function deletePlaylist(playlistName: string) {
//   const playlists = getPlaylists();
//   delete playlists[playlistName];
//   localStorage.setItem("playlists", JSON.stringify(playlists));
// }

export function getPlaylists() {
  const playlistsString = localStorage.getItem("playlists");
  return playlistsString ? JSON.parse(playlistsString) : {};
}


export function usereadlist(){
  
}