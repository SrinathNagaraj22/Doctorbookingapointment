import { createContext } from "react";

export const AppContext = createContext();

const calculateAge = (dob)=>{
  const today = new Date()
  const birthDate = new Date(dob)

  let age = today.getFullYear() - birthDate.getFullYear()
  return age 
}

const AppContextProvider = (props) => {
  const value = {
    calculateAge
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
