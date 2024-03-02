import { useQuery } from "@tanstack/react-query";
import { Book, EditBook } from "../types";

const baseUrl = "https://openlibrary.org";

export function useRecentChanges() {
  return useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/recentchanges/add-book.json`);
      const data = await response.json();

      const keys = Object.keys(data.reduce((acc: { [key: string]: boolean }, item: EditBook) => {
        const key = item.changes[0].key;
        if (key.includes("book")) {
          acc[key] = true;
        }
        return acc;
      }, {}));
      console.log("keys", keys);
      
      const booksData = await Promise.all(
        keys.map(async (key: string) => {
          return await booksFetch(key);
        })
      );
      console.log("TEST", booksData);

      return booksData as Book[];
    },
  });
}


// export function useRecentChanges() {
//   return useQuery({
//     queryKey: ["books"],
//     queryFn: async () => {
//       const response = await fetch(`${baseUrl}/recentchanges/edit-book.json`);
//       const data = await response.json();

//       // Créer un objet pour stocker les clés de manière unique
//       const uniqueKeys: { [key: string]: boolean } = data
//         .map((item: EditBook) => item.changes[0].key)
//         .reduce((acc: { [key: string]: boolean }, key: string) => {
//           if (key.includes("book")) {
//             acc[key] = true;
//           }
//           return acc;
//         }, {});

//       // Trouver la première clé de livre unique
//       const bookKey = Object.keys(uniqueKeys).find(key => key.includes("book"));
//       console.log("book key", bookKey);

//       if (!bookKey) {
//         return null; // Aucun livre trouvé
//       }

//       // Récupérer les données du livre correspondant
//       const bookData = await booksFetch(bookKey);
//       console.log("book data", bookData);

//       return bookData as Book;
//     },
//   });
// }



async function booksFetch(bookId: string) {
  const books = await fetch(`${baseUrl}${bookId}.json`, {});
  return books.json();
}




