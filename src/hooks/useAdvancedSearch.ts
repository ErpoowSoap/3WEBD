import { useState, useEffect } from 'react';

const useAdvancedSearch = () => {
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [publishYear, setPublishYear] = useState<string>('');
    const [isbn, setIsbn] = useState<string>('');
    const [theme, setTheme] = useState<string>('');
    const [publisher, setPublisher] = useState<string>('');
    const [results, setResults] = useState<TestBook[]>([]);

    useEffect(() => {
        const handleSearch = async () => {
            try {
                const url = new URL('https://openlibrary.org/search.json');
                if (title) url.searchParams.append('title', title);
                if (author) url.searchParams.append('author', author);
                if (publishYear) url.searchParams.append('first_publish_year', publishYear);
                if (isbn) url.searchParams.append('isbn', isbn);
                if (theme) url.searchParams.append('subject', theme);
                if (publisher) url.searchParams.append('publisher', publisher);

                const response = await fetch(url.toString());
                const data = await response.json();

                setResults(data.docs);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        handleSearch();
    }, [title, author, publishYear, isbn, theme, publisher]);

    return {
        title,
        setTitle,
        author,
        setAuthor,
        publishYear,
        setPublishYear,
        isbn,
        setIsbn,
        theme,
        setTheme,
        publisher,
        setPublisher,
        results
    };
};

export default useAdvancedSearch;
