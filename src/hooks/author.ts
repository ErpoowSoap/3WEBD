import { useQuery } from "@tanstack/react-query";
import { Authors } from "../types";


const baseUrl = "https://openlibrary.org";

export function useAuthorById({authorId}: {authorId: string}) {
  return useQuery({
    queryKey: ["author", {authorId}],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/authors/${authorId}.json`);
      const data = await response.json();
      console.log("data", data as Authors[]);
      return data as Authors[];
    },
    });
}