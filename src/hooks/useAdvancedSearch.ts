import { useState } from 'react';
import { AdvancedSearch} from '../types';


const useAdvancedSearch = () => {
    const [searchCriteria, setSearchCriteria] = useState({
        title: '',
        author: '',
        publishYear: '',
        isbn: '',
        theme: '',
        publisher: ''
    });
    const [results, setResults] = useState<AdvancedSearch[]>([]);

    const handleSearch = async () => {
        try {
            const url = new URL('https://openlibrary.org/search.json');

            Object.entries(searchCriteria).forEach(([key, value]) => {
                if (value && key in searchCriteria) {
                    url.searchParams.append(key, value);
                }
            });

            const response = await fetch(url.toString());
            const data = await response.json();
            console.log(data);
            setResults(data.docs);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return {
        searchCriteria,
        setSearchCriteria,
        results,
        handleSearch
    };
};

export default useAdvancedSearch;
