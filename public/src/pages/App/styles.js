import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  background: {
    position: "fixed",
    inset: 0,
    backgroundColor: "#eee"
  },
  wrapper: {
    position: "absolute",
    inset: 0,
    display: 'flex',
    alignItems: "center",
    padding: 24
  },
  container: {
    maxHeight: 750,
    height: "100%",
    maxWidth: 750,
    width: "100%",
    backgroundColor: "white",
    display: "flex"
  },
  contacts: {
    width: "25%",
    borderRight: `1px solid ${theme.colors.gray[0]}`,
    padding: `0 ${theme.spacing.xs}px`
  },
  chatRoom: {
    width: "75%"
  },
}))