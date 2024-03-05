import {AdvancedSearch} from "../types.ts";
import {useState} from "react";

const useGeneralSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<AdvancedSearch[]>([]);

    const handleSearch = async () => {
        try {
            const url = new URL('https://openlibrary.org/search.json');
            url.searchParams.append('q', query);

            const response = await fetch(url.toString());
            const data = await response.json();
            console.log("data:", data);
            setResults(data.docs);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return {
        query,
        setQuery,
        results,
        handleSearch
    };
};

export default useGeneralSearch;