import { useState } from 'react';
import useAdvancedSearch from '../hooks/useAdvancedSearch';
import './AdvancedSearchPage.css';

const AdvancedSearch = () => {
    const [searchClicked, setSearchClicked] = useState<boolean>(false);
    const {
        searchCriteria,
        setSearchCriteria,
        results,
        handleSearch
    } = useAdvancedSearch();

    const handleClickSearch = () => {
        handleSearch();
        setSearchClicked(true);
    };

    return (
        <div className="container">
            <h1>Advanced Search</h1>
            <div className="row">
                <div className="form-group">
                    <input type="text" value={searchCriteria.title} onChange={e => setSearchCriteria({ ...searchCriteria, title: e.target.value })} placeholder="Title"/>
                </div>
                <div className="form-group">
                    <input type="text" value={searchCriteria.author} onChange={e => setSearchCriteria({ ...searchCriteria, author: e.target.value })} placeholder="Author"/>
                </div>
            </div>
            <div className="row">
                <div className="form-group">
                    <input type="text" value={searchCriteria.publishYear} onChange={e => setSearchCriteria({ ...searchCriteria, publishYear: e.target.value })} placeholder="Publish Year"/>
                </div>
                <div className="form-group">
                    <input type="text" value={searchCriteria.isbn} onChange={e => setSearchCriteria({ ...searchCriteria, isbn: e.target.value })} placeholder="ISBN"/>
                </div>
            </div>
            <div className="row">
                <div className="form-group">
                    <input type="text" value={searchCriteria.theme} onChange={e => setSearchCriteria({ ...searchCriteria, theme: e.target.value })} placeholder="Theme"/>
                </div>
                <div className="form-group">
                    <input type="text" value={searchCriteria.publisher} onChange={e => setSearchCriteria({ ...searchCriteria, publisher: e.target.value })} placeholder="Publisher"/>
                </div>
            </div>

            <button className="search-button" onClick={handleClickSearch}>Search</button>
            {searchClicked && ( // Render results only when the search button is clicked
                <ul>
                    {results.map((book, index) => (
                        <li key={index}>{book.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdvancedSearch;
