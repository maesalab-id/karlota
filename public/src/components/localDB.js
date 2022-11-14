import { createContext, useContext, useMemo } from 'react';
import { Messages } from './localDBServices/messages';

const LocalDB = () => {
  const messages = new Messages();
  return { messages };
};

export const LocalDBContext = createContext({});

export const LocalDBProvider = (props) => {
  const localDb = useMemo(() => {
    return LocalDB();
  }, []);
  return <LocalDBContext.Provider {...props} value={localDb} />;
};

export const useLocalDB = () => {
  return useContext(LocalDBContext);
};
