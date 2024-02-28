import { Card, Image, Text, Group,Center, Button } from "@mantine/core";
import { IconTrees, IconHeart } from "@tabler/icons-react";
import classes from "./BookCard.module.css";
import { TestBook } from "../types";

interface BookCardProps {
  book: TestBook;
}

const mockdata = [
  { label: "Romance", icon: IconHeart },
  { label: "Aventure", icon: IconTrees },
  // { label: "Automatic gearbox", icon: IconManualGearbox },
  // { label: "Electric", icon: IconGasStation },
];

export function BookCard(props: BookCardProps) {
  const { book } = props;
  const covert = book.key.split("/")[2];
  const features = mockdata.map((feature, index) => (
    <Center key={index}>
      <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
      <Text size="xs">{feature.label}</Text>
    </Center>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image
          src={`https://covers.openlibrary.org/b/olid/${covert}-L.jpg`}
          alt="Tesla Model S"
        />
      </Card.Section>

      <Group justify="space-between" mt="md">
        <div>
          <Text fw={500}>{book.title}</Text>
          <Text fz="xs" c="dimmed">
            lalala
          </Text>
        </div>
        {/* <Badge variant="outline">dispo</Badge> */}
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Text fz="xs" c="dimmed">
          lalala
        </Text>
        <Text fz="sm" c="dimmed" className={classes.label}>
          Thèmes :
        </Text>

        <Group gap={8} mb={-8}>
          {features}
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group gap={30}>
          <Button radius="xl" style={{ flex: 1 }}>
            Rent now
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
}
