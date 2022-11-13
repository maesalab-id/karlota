import { Stack } from "@mantine/core";
import { useListContext } from "components/List";
import { useNavigate } from "react-router-dom";
import { Item } from "./Item";

export const List = () => {
  const { items } = useListContext();
  const navigate = useNavigate();
  return (<Stack py="md" spacing={4}>
    {items.map(({ id, phone }) => <Item key={id} id={id} name={phone} lastChat={phone} onClick={() => {
      navigate(`/${id}`);
    }} />)}
  </Stack>);
}