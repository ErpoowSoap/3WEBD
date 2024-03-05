import { useState } from "react";
import { SearchCard } from "../component/SearchCard.tsx";
import useAdvancedSearch from "../hooks/useAdvancedSearch";
import styles from "./AdvancedSearchPage.module.css";
// import styles from "./HomePage.module.css";
import { PaginationPage } from "../component/Pagination";

export default function AdvancedSearchPage() {
  const { results, searchCriteria, setSearchCriteria, handleSearch } =
    useAdvancedSearch();
  console.log(results);
  const [activePage, setActivePage] = useState(1);

  const handleClickSearch = () => {
    handleSearch();
  };

  const itemsPerPage = 12;
  const totalPages = Math.ceil(results.length / itemsPerPage);
  const startIndex = (activePage - 1) * itemsPerPage;
  const itemsToShow = results.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <div className={styles.container}>
        <h1>Advanced Search</h1>
        <div className={styles.row}>
          <div className={styles.form_group}>
            <input
              type="text"
              value={searchCriteria.title}
              onChange={(e) =>
                setSearchCriteria({ ...searchCriteria, title: e.target.value })
              }
              placeholder="Title"
            />
          </div>
          <div className={styles.form_group}>
            <input
              type="text"
              value={searchCriteria.author}
              onChange={(e) =>
                setSearchCriteria({ ...searchCriteria, author: e.target.value })
              }
              placeholder="Author"
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.form_group}>
            <input
              type="text"
              value={searchCriteria.publishYear}
              onChange={(e) =>
                setSearchCriteria({
                  ...searchCriteria,
                  publishYear: e.target.value,
                })
              }
              placeholder="Publish Year"
            />
          </div>
          <div className={styles.form_group}>
            <input
              type="text"
              value={searchCriteria.isbn}
              onChange={(e) =>
                setSearchCriteria({ ...searchCriteria, isbn: e.target.value })
              }
              placeholder="ISBN"
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.form_group}>
            <input
              type="text"
              value={searchCriteria.theme}
              onChange={(e) =>
                setSearchCriteria({ ...searchCriteria, theme: e.target.value })
              }
              placeholder="Theme"
            />
          </div>
          <div className={styles.form_group}>
            <input
              type="text"
              value={searchCriteria.publisher}
              onChange={(e) =>
                setSearchCriteria({
                  ...searchCriteria,
                  publisher: e.target.value,
                })
              }
              placeholder="Publisher"
            />
          </div>
        </div>
        <button className={styles.search_button} onClick={handleClickSearch}>
          Search
        </button>
      </div>
      {results.length > 0 && (
        <div className={styles.list} style={{ minHeight: "400px" }}>
          <div className={styles.containerList}>
            {itemsToShow.map((book) => (
              <SearchCard key={book.key} book={book} />
            ))}
          </div>
          {results.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "150px",
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
      )}
    </>
  );
}
