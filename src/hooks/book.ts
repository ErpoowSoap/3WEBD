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

export function useBook({ bookId }: { bookId: string }) {
  return useQuery({
    queryKey: ["detailsBook", { bookId }],
    queryFn: async () => {
      const bookData = await booksFetch("/books/" + bookId);
      const workData =
        bookData.works && bookData.works.length > 0
          ? await worksFetch(bookData.works[0].key)
          : null;
      const authorData =
        workData.authors && workData.authors.length > 0
          ? await authorsFetch(workData.authors[0].author.key)
          : null;
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
