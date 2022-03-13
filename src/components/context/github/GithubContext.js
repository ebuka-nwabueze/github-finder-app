import axios from "axios";
import { createContext, useReducer } from "react";
import githubReducer from "../github/GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_API_TOKEN = process.env.REACT_APP_GITHUB_API_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    userList: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // fetch all users using search parameter
  const fetchUser = async (text) => {
    setLoading();

    const params = new URLSearchParams({ q: text });

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

  //fetch a single user
  const fetchSingleUser = async (login) => {
    setLoading();

    const res = await axios.get(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_API_TOKEN}`,
      },
    });
   
    if(res.status === 404){
      window.location('/notfound')
    } else {
      dispatch({
        type: "GET_SINGLE_USER",
        payload: res.data,
      });
    }
  };

  // Get user repos
  const fetchUserRepos = async (login) => {
    setLoading();

    const res = await axios.get(`${GITHUB_URL}/users/${login}/repos`, {
      headers: {
        Authorization: `token ${GITHUB_API_TOKEN}`,
      },
    });

    dispatch({
      type: "GET_REPOS",
      payload: res.data,
    });
  };

  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  const clearUsers = () => {
    dispatch({
      type: "CLEAR_USERS",
    });
  };

  return (
    <GithubContext.Provider
      value={{
        userList: state.userList,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        fetchUser,
        clearUsers,
        fetchSingleUser,
        fetchUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
