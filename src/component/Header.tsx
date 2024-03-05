import { Autocomplete, Group, Burger, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";

const links = [
  { link: "/details", label: "Details" },
  { link: "/playlist", label: "Playlist" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={classes.link}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <Link to= "/">
          <img className= {classes.logo} src="./src/assets/image/logo.png" alt="/" />
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
            data={[
              "Livre 1",
              "Livre 2",
              "Livre 3",
            ]}
            visibleFrom="xs"
          />
        </Group>
      </div>
    </header>
  );
}
