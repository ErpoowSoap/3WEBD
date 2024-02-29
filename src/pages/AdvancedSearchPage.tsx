import { useState } from 'react';

interface Book {
    key: string;
    title: string;
    author_name: string[];
    first_publish_year: number;
    isbn: string[];
    subject: string[];
    publisher: string[];
    // Ajoutez d'autres propriétés au besoin
}

const AdvancedSearchPage = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [isbn, setIsbn] = useState('');
    const [theme, setTheme] = useState('');
    const [publisher, setPublisher] = useState('');
    const [results, setResults] = useState<Book[]>([]);

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

    return (
        <div>
            <h1>Advanced Search</h1>
            <div>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Author:
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    First Publish Year:
                    <input type="text" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    ISBN:
                    <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Theme:
                    <input type="text" value={theme} onChange={(e) => setTheme(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Publisher:
                    <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
                </label>
            </div>
            <button onClick={handleSearch}>Search</button>
            <div>
                <h2>Search Results:</h2>
                <ul>
                    {results.map((result) => (
                        <li key={result.key}>
                            <div>Title: {result.title}</div>
                            <div>Author(s): {result.author_name ? result.author_name.join(', ') : 'Unknown'}</div>
                            <div>First Publish Year: {result.first_publish_year}</div>
                            <div>ISBN: {result.isbn ? result.isbn.join(', ') : 'Unknown'}</div>
                            <div>Theme: {result.subject ? result.subject.join(', ') : 'Unknown'}</div>
                            <div>Publisher: {result.publisher ? result.publisher.join(', ') : 'Unknown'}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdvancedSearchPage;
