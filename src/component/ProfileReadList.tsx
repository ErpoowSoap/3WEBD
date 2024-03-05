import { Avatar, Text, Button, Paper } from "@mantine/core";
import { PlaylistItem } from "../types";

interface ProfileCardProps {
  playlist: PlaylistItem;
}
3
export function ProfileReadList({ playlist }: ProfileCardProps) {
  return (
    <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
      <Avatar
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
        size={120}
        radius={120}
        mx="auto"
      />
      <Text ta="center" fz="lg" fw={500} mt="md">
        {playlist.name}
      </Text>
      <Button variant="default" fullWidth mt="md">
        Send message
      </Button>
    </Paper>
  );
}
