import { useClient } from "components/client";
import { ListContextProvider } from "components/List"
import { useCallback } from "react"
import { List } from "./List";

export const Contacts = () => {
  const client = useClient();
  const fetch = useCallback(async ({ filter, pagination }) => {
    try {
      const query = {}
      const res = await client.service("users").find({ query })
      return res;
    } catch (err) {
      console.error(err);
      return {};
    }
  }, [client]);
  return (
    <ListContextProvider resource="contacts" queryFn={fetch} limit={10}>
      <List />
    </ListContextProvider>
  )
}