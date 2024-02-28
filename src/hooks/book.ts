import { useQuery } from "@tanstack/react-query";
import { EditBook } from "../types";

const baseUrl = "https://openlibrary.org";


export function useRecentChanges() {
  return useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/recentchanges/edit-book.json`);
      const data = await response.json();

      const keys = data
        .map((item: EditBook) => item.changes[0].key)
        .filter((key: string) => key.includes("book"));
      console.log("data", data as EditBook[]);
      console.log("keys", keys);
      const test = await Promise.all(
        keys.map(async (key: string) => {
          return await testFetch(key);
        })
      );
      console.log("TEST", test);

      return test;
    },
  });
}

async function testFetch(bookId: string) {
  const test = await fetch(`${baseUrl}${bookId}.json`, {});
  return test.json();
}
