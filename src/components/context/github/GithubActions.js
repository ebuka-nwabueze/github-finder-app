import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_API_TOKEN = process.env.REACT_APP_GITHUB_API_TOKEN;



const headers =  { Authorization: `token ${GITHUB_API_TOKEN}` }

// fetch all users using search parameter
export const fetchUser = async (text) => {
  const params = new URLSearchParams({ q: text });
    try {
      const res = await axios.get(`https://api.github.com/search/users?q=${text}`,headers);
      return res.data.items;
    } catch (error) {
      console.log(error.message)
    }

};

// Get user and repos

export const fetchUserAndRepos = async (login) => {
    const params = new URLSearchParams({ sort: "created", per_page: 10 });
    const [user, repos] = await Promise.all([
        axios.get(`${GITHUB_URL}/users/${login}`, headers),
        axios.get(`${GITHUB_URL}/users/${login}/repos?${params}`,headers)
    ])

    return {user:user.data, repos: repos.data}
}   