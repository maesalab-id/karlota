import { Avatar, createStyles, Group, Text, UnstyledButton } from "@mantine/core";
import { useParams } from "react-router-dom";

export const Item = ({ id, name, onClick }) => {
  const { classes, cx } = useStyles();
  const params = useParams();

  return (
    <UnstyledButton
      className={cx(classes.container, { ["active"]: params.id === `${id}` })}
      onClick={onClick}
    >
      <Group>
        <Avatar>{name.substring(0, 2)}</Avatar>
        <Group>
          <Text weight={"bold"}>{id} {name}</Text>
        </Group>
      </Group>
    </UnstyledButton>
  );
}

const useStyles = createStyles((theme) => ({
  container: {
    borderRadius: theme.radius.md,
    display: "block",
    width: "100%",
    padding: theme.spacing.xs,
    paddingLeft: theme.spacing.sm,
    paddingRight: theme.spacing.sm,
    '&.active': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
    },
  },
}))