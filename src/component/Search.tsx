import { useState } from "react";

interface Book {
    title: string;
}

function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await response.json();
            setResults(data.docs || []);
        } catch (error) {
            setError("Error fetching data");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? "Loading..." : "Search"}
            </button>
            {error && <p>{error}</p>}
            <ul>
                {results.map((result, index) => (
                    <li key={index}>{result.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default Search;
