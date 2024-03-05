import { PlaylistItem, PlaylistItem_Content } from "../types";

export function addPlaylist(playlistItem: PlaylistItem): void {
  const playlists = getPlaylists();
  playlists.push(playlistItem);
  const playlistString = JSON.stringify(playlists);
  localStorage.setItem("playlists", playlistString);
}

export function removePlaylist(index: number): void {
  const playlists = getPlaylists();
  playlists.splice(index, 1);
  const playlistString = JSON.stringify(playlists);
  localStorage.setItem("playlists", playlistString);
}

export function getPlaylists(): PlaylistItem[] {
  const playlistString = localStorage.getItem("playlists");
  return playlistString ? JSON.parse(playlistString) : [];
}

export function getPlaylistItems(idPlaylist: number): PlaylistItem_Content[] {
  const playlists = getPlaylistsContent(); 
  const playlistItems: PlaylistItem_Content[] = [];

  playlists.forEach(playlist => {
    if (playlist.id === idPlaylist) {
      playlistItems.push(playlist);
    }
  });

  

  return playlistItems;
}


// item playlist

export function getPlaylistsContent(): PlaylistItem_Content[] {
  const playlistString = localStorage.getItem("playlists_content");
  return playlistString ? JSON.parse(playlistString) : [];
}

export function addToPlaylist(addPlaylist: PlaylistItem_Content): void {
  const playlists = getPlaylistsContent();
  playlists.push(addPlaylist);
  const playlistString = JSON.stringify(playlists);
  localStorage.setItem("playlists_content", playlistString);
}