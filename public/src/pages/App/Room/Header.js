import { Avatar, Group, Text } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useClient } from "components/client";
import { useParams } from "react-router-dom";

export const Header = () => {
  const params = useParams();
  const client = useClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["room", params.id], queryFn: async () => {
      let res = await client.service('users').get(params.id);
      console.log(res);
      return res;
    }
  });

  if (isLoading) {
    return <div>Loading</div>
  }
  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <Group p="sm">
      <Avatar>{data.email.slice(0, 2)}</Avatar>
      <Text weight={"bold"}>{data.email}</Text>
    </Group>
  )
}