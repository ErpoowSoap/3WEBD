import { useState } from "react";
import { Autocomplete, Group, Burger, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";

interface Book {
  title: string;
}

const links = [
  { link: "/about", label: "Features" },
  { link: "/pricing", label: "Pricing" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
];

export function Header(): JSX.Element {
  const [opened, { toggle }] = useDisclosure(false);
  const [searchValue, setSearchValue] = useState("");
  const [autocompleteData, setAutocompleteData] = useState<string[]>([]);

  const handleSearch = async (value: string) => {
    setSearchValue(value);
    try {
      const response = await fetch(
          `http://openlibrary.org/search.json?q=${value}`
      );
      const data = await response.json();
      const books: string[] = data.docs.map((book: Book) => book.title);
      const uniqueBooks = [...new Set(books)];
      setAutocompleteData(uniqueBooks);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };


  return (
      <header className={classes.header}>
        <div className={classes.inner}>
          <Group>
            <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
            <Link to="/">
              <img
                  className={classes.logo}
                  src="./src/assets/image/logo.avif"
                  alt="Sagesse Eternelle"
              />
            </Link>
            <h3>Sagesse Eternelle</h3>
          </Group>

          <Group>
            <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
              {links.map((link) => (
                  <a
                      key={link.label}
                      href={link.link}
                      className={classes.link}
                      onClick={(event) => event.preventDefault()}
                  >
                    {link.label}
                  </a>
              ))}
            </Group>
            <Link to="/search" className={classes.link}>
              Advanced Search
            </Link>
            <Autocomplete
                className={classes.search}
                placeholder="Search"
                value={searchValue}
                onChange={handleSearch}
                data={autocompleteData}
                leftSection={
                  <IconSearch
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                  />
                }
                visibleFrom="xs"
            />
          </Group>
        </div>
      </header>
  );
}
