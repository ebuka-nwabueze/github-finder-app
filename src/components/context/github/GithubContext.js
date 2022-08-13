import { createContext, useReducer } from "react";
import githubReducer from "../github/GithubReducer";

const GithubContext = createContext(); 

export const GithubProvider = ({ children }) => {
  const initialState = {
    userList: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
