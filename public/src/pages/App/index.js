import { useEffect } from "react";
import { useClient } from "components/client";
import { Outlet, useNavigate } from "react-router-dom";
import { useStyles } from "./styles";
import { Container, Group } from "@mantine/core";
import { Contacts } from "./Contacts";

function App() {
  const { classes } = useStyles();
  const client = useClient();
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client.reAuthenticate();
      } catch (err) {
        navigate("/login");
      }
    };
    fetch();
  }, []);

  return (
    <div className={classes.background}>
      <div className={classes.wrapper}>
        <Container p={0} className={classes.container}>
          <div className={classes.contacts}>
            <Contacts />
          </div>
          <div className={classes.chatRoom}>
            <Outlet />
          </div>
        </Container>
      </div>
    </div>
  );
}

export default App;
