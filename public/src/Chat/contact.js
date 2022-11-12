import { Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useClient } from "../hooks/client";

export const Contact = () => {
  const client = useClient();

  const query = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      let res = [];
      console.log("query")
      try {
        res = await client.service("users").find({});
        console.log(res);
      } catch (err) {
        console.error(err);
      }
      return res;
    },
  });

  if (query.error) {
    return <div>{JSON.stringify(query.error)}</div>;
  }

  return (
    <Flex w={"25%"}>
      {JSON.stringify(query.data)}
      {/* {query.data.d.map((contact, id) => (
        <Flex>{id}</Flex>
      ))} */}
    </Flex>
  );
};
