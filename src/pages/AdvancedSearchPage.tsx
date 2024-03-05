import { useState } from 'react';
import { SearchCards } from "../component/SearchCards.tsx";
import useAdvancedSearch from '../hooks/useAdvancedSearch';
import './AdvancedSearchPage.css';
import styles from "./HomePage.module.css";
import { PaginationPage } from "../component/Pagination";
const AdvancedSearchPage = () => {
    const { results, searchCriteria, setSearchCriteria, handleSearch } = useAdvancedSearch();
    const [activePage, setActivePage] = useState(1);


    const handleClickSearch = () => {
        handleSearch();
    };

    const itemsPerPage = 10; // Number of items per page
    const totalPages = Math.ceil(results.length / itemsPerPage);
    const startIndex = (activePage - 1) * itemsPerPage;
    const itemsToShow = results.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="container">
            <h1>Advanced Search</h1>
            <div className="row">
                <div className="form-group">
                    <input type="text" value={searchCriteria.title}
                           onChange={e => setSearchCriteria({...searchCriteria, title: e.target.value})}
                           placeholder="Title"/>
                </div>
                <div className="form-group">
                    <input type="text" value={searchCriteria.author}
                           onChange={e => setSearchCriteria({...searchCriteria, author: e.target.value})}
                           placeholder="Author"/>
                </div>
            </div>
            <div className="row">
                <div className="form-group">
                    <input type="text" value={searchCriteria.publishYear}
                           onChange={e => setSearchCriteria({...searchCriteria, publishYear: e.target.value})}
                           placeholder="Publish Year"/>
                </div>
                <div className="form-group">
                    <input type="text" value={searchCriteria.isbn}
                           onChange={e => setSearchCriteria({...searchCriteria, isbn: e.target.value})}
                           placeholder="ISBN"/>
                </div>
            </div>
            <div className="row">
                <div className="form-group">
                    <input type="text" value={searchCriteria.theme}
                           onChange={e => setSearchCriteria({...searchCriteria, theme: e.target.value})}
                           placeholder="Theme"/>
                </div>
                <div className="form-group">
                    <input type="text" value={searchCriteria.publisher}
                           onChange={e => setSearchCriteria({...searchCriteria, publisher: e.target.value})}
                           placeholder="Publisher"/>
                </div>
            </div>
            <button className="search-button" onClick={handleClickSearch}>Search</button>

            <div className={styles.root} style={{minHeight: "400px"}}>
                <div className={styles.container}>
                    {itemsToShow.map((book) => (
                        <SearchCards key={book.title} book={book}/>
                    ))}
                </div>
                {results.length > 0 && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "150px"
                        }}
                    >
                        <PaginationPage
                            total={totalPages}
                            activePage={activePage}
                            onChange={setActivePage}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdvancedSearchPage;
