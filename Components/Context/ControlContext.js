import React, {createContext} from 'react';
import useFirebase from '../Authentic/firebase/useFirebase';

export const SocketContext = createContext();

const ControlContext = ({children}) => {
  const allValue = useFirebase();
  return (
    <SocketContext.Provider value={allValue}>{children}</SocketContext.Provider>
  );
};

export default ControlContext;
