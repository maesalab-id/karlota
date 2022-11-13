import { createStyles, Group, Text } from "@mantine/core";

export const ChatBaloon = ({
  id,
  type,
  content,
  isSender,
  name,
  timestamp
}) => {
  const { classes } = useStyles({ isSender });
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Group>
          <Text size="sm" weight={"bold"} className={classes.name}>{name}</Text>
          <Text size="xs">{timestamp}</Text>
        </Group>
        <Text size="sm">{content}</Text>
      </div>
    </div>
  )
}

const useStyles = createStyles((theme, { isSender }) => ({
  wrapper: {
    overflow: "hidden",
  },
  container: {
    backgroundColor: isSender ? "white" : theme.colors.green[1],
    borderRadius: theme.radius.sm,
    borderTopLeftRadius: isSender ? 0 : theme.radius.sm,
    borderTopRightRadius: isSender ? theme.radius.sm : 0,
    marginBottom: theme.spacing.md,
    marginLeft: isSender ? theme.spacing.lg : 0,
    marginRight: isSender ? 0 : theme.spacing.lg,
    padding: theme.spacing.xs,
    position: "relative",
    boxShadow: "0px 2px 1px rgb(0 0 0 / 10%), inset 0px 2px 1px rgb(255 255 255 / 25%)",
    maxWidth: "75%",
    float: isSender ? "left" : "right",

    '&:after': {
      content: `""`,
      borderWidth: 10,
      borderTop: `15px solid ${isSender ? "white" : theme.colors.green[1]}`,
      borderLeft: "15px solid transparent",
      transform: `scaleX(${isSender ? 1 : -1})`,
      height: 0,
      width: 0,
      position: "absolute",
      right: isSender ? "100%" : "auto",
      left: isSender ? "auto" : "100%",
      top: 0
    }
  },
  name: {
    color: isSender ? theme.colors.blue[5] : theme.colors.green[5],
    flexGrow: 1,

  }
}));