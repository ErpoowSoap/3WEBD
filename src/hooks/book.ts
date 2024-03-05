import { useQuery } from "@tanstack/react-query";
import { Book, EditBook } from "../types";

const baseUrl = "https://openlibrary.org";

export function useRecentChanges() {
  return useQuery({
    queryKey: ["book"],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/recentchanges.json`);
      const data = await response.json();

      const booksChanges = data.filter((item: EditBook) =>
        ["add-book", "add-cover", "edit-book"].includes(item.kind)
      );

      const keys: string[] = [];
      const keysSet = new Set<string>();
      booksChanges.forEach((item: EditBook) => {
        const key = item.changes[0].key;
        if (key.includes("books") && !keysSet.has(key)) {
          keys.push(key);
          keysSet.add(key);
        }
      });
      console.log("keys", keys);

      const booksData = await Promise.all(
        keys.map(async (key: string) => {
          const bookData = await booksFetch(key);
          return {
            ...bookData,
            kind: booksChanges.find(
              (item: EditBook) => item.changes[0].key === key
            )?.kind,
          };
        })
      );
      console.log("booksDatatest", booksData);
      return booksData as Book[];
    },
  });
}


export function useDetailBook({ bookId }: { bookId: string }) {
  return useQuery({
    queryKey: ["detailsBook", { bookId }],
    queryFn: async () => {

      let bookData = {} as Book;
      let workData;
      let authorData;

      if (bookId.endsWith("M")) {
        bookData = await booksFetch("/books/" + bookId);
        workData =
          bookData.works && bookData.works.length > 0
            ? await worksFetch(bookData.works[0].key)
            : null;
        if (workData.authors && workData.authors.length > 0) {
          authorData = await authorsFetch(workData.authors[0].author.key);
        }
      } else if (bookId.endsWith("W")) {
        workData = await worksFetch("/works/" + bookId);
        if (workData.authors && workData.authors.length > 0) {
          authorData = await authorsFetch(workData.authors[0].author.key);
        }
      } else {
        throw new Error("Invalid bookId format");
      }


      return { ...bookData, workData, authorData } as Book;
    },
  });
}


export function useBooksInPlaylist(keys: string[]) {
  return useQuery({
    queryKey: ["books", keys],
    queryFn: async () => {
      const booksData = await Promise.all(
        keys.map(async (key: string) => {
          const bookData = await booksFetch(key);
          return bookData;
        })
      );
      return booksData as Book[];
    },
  });
}

async function booksFetch(bookId: string) {
  const books = await fetch(`${baseUrl}${bookId}.json`, {});
  return books.json();
}

async function worksFetch(workId: string) {
  const works = await fetch(`${baseUrl}${workId}.json`, {});
  return works.json();
}

async function authorsFetch(authorId: string) {
  const authors = await fetch(`${baseUrl}${authorId}.json`, {});
  return authors.json();
}
