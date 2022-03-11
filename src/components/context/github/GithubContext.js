import axios from "axios";
import { createContext, useReducer } from "react";
import githubReducer from "../github/GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_API_TOKEN = process.env.REACT_APP_GITHUB_API_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    userList: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const fetchUser = async (text) => {
    setLoading();

    const params = new URLSearchParams({q:text})

    const res = await axios.get(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_API_TOKEN}`,
      },
    });
  

    dispatch({
      type: "GET_USERS",
      payload: res.data.items,
    });
  };

  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  const clearUsers = () => {
    dispatch({
      type: "CLEAR_USERS"
    })
  }

  return (
    <GithubContext.Provider
      value={{ userList: state.userList, loading: state.loading, fetchUser, clearUsers }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
