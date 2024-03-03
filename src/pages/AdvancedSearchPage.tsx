import React from 'react';
import useAdvancedSearch from "../hooks/useAdvancedSearch.ts";
import { Card } from "../component/Card";

const AdvancedSearchPage: React.FC = () => {
    const {
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
        results,
    } = useAdvancedSearch();

    const handleSearch = () => {
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
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {results.map((result) => (
                        <Card key={result.key} book={result} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdvancedSearchPage;
