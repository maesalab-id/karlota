import "./App.css";
import { useEffect } from "react";
import { useClient } from "./hooks/client";
import { useNavigate } from "react-router-dom";

function App() {
  const client = useClient();
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client.reAuthenticate();
        console.log(res);
      } catch (err) {
        navigate("/login");
      }
    };
    fetch();
  }, []);

  return null;
}

export default App;
