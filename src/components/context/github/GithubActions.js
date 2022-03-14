import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_API_TOKEN = process.env.REACT_APP_GITHUB_API_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token ${GITHUB_API_TOKEN}` },
});

// fetch all users using search parameter
export const fetchUser = async (text) => {
  const params = new URLSearchParams({ q: text });

  const res = await github.get(`/search/users?${params}`);
  return res.data.items;
};

// Get user and repos

export const fetchUserAndRepos = async (login) => {
    const params = new URLSearchParams({ sort: "created", per_page: 10 });
    const [user, repos] = await Promise.all([
        github.get(`/users/${login}`),
        github.get(`/users/${login}/repos?${params}`)
    ])

    return {user:user.data, repos: repos.data}
}   