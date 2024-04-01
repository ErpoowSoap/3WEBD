import { Link, useNavigate } from "react-router-dom";
import { Autocomplete, Group, Burger, rem, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import classes from "./Header.module.css";
import useGeneralSearch from "../hooks/useGeneralSearch.ts";
import { AdvancedSearch } from "../types.ts";

const links = [
    { link: "/playlist", label: "ReadList" },
    { link: "/search", label: "Advanced Search" },
];

export function Header() {
    const [opened, { toggle }] = useDisclosure(false);
    const { query, setQuery, results, handleSearch } = useGeneralSearch();
    const navigate = useNavigate();

    const handleSearchClick = () => {
        handleSearch();
    };

    const items = links.map((link) => (
        <Link key={link.label} to={link.link} className={classes.link}>
            {link.label}
        </Link>
    ));

    return (
        <header className={classes.header}>
            <div className={classes.inner}>
                <Group>
                    <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
                    <Link to="/">
                        <img
                            className={classes.logo}
                            src="./src/assets/image/logo.png"
                            alt="/"
                        />
                    </Link>
                    <h3>Sagesse Eternelle</h3>
                </Group>

                <Group>
                    <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
                        {items}
                    </Group>
                    <Autocomplete
                        className={classes.search}
                        placeholder="Search"
                        leftSection={
                            <IconSearch
                                style={{ width: rem(16), height: rem(16) }}
                                stroke={1.5}
                            />
                        }
                        data={results.map((result: AdvancedSearch) => result.title).filter((value, index, self) => self.indexOf(value) === index)}
                        value={query}
                        onChange={(value) => {
                            setQuery(value);
                        }}
                        visibleFrom="xs"
                        onSelect={(event) => {
                            const selectedOption = (event.target as HTMLInputElement).value;
                            const selectedBook = results.find(result => result.title === selectedOption);
                            if (selectedBook) {
                                const keyParts = selectedBook.key.split('/');
                                const bookId = keyParts[keyParts.length - 1];
                                navigate(`/details/${bookId}`);
                            }
                        }}
                    />
                    <Button onClick={handleSearchClick} variant="outline">Search</Button>
                </Group>
            </div>
            <div>
                {opened && (
                    <Group className={classes.links}>
                        {items}
                    </Group>
                )}
            </div>
        </header>
    );
}
