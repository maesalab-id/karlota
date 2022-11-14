import { Avatar, Group, Text } from '@mantine/core';
import { useRoom } from './RoomContext';

export const Header = () => {
  const {
    userQuery: { data, isLoading, isError },
  } = useRoom();

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <Group p="sm">
      <Avatar>{data.email.slice(0, 2)}</Avatar>
      <Text weight={'bold'}>{data.email}</Text>
    </Group>
  );
};
