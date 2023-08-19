import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [githubUser, setGithubUser] = useState({});
  const [repositories, setRepositories] = useState([]);
  const [userName, setUserName] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);

  // Fetching user data from Github API
  const fetchUserData = async () => {
    if (!userName) {
      return;
    }
    try {
      const response = await fetch(`https://api.github.com/users/${userName}`);
      if (!response.ok) {
        setError("User not found");
      } else {
        setError(null);
        const data = await response.json();
        console.log(data);
        setGithubUser(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Fetching repositories data from Github API
  const fetchRepositories = async () => {
    if (!userName) {
      return;
    }
    try {
      const response = await fetch(
        `https://api.github.com/users/${userName}/repos`
      );
      if (!response.ok) {
        setError("user not found");
      } else {
        const data = await response.json();
        console.log(data);
        setRepositories(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchRepositories();
  }, [userName]);


  // Handling input
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  // Handling submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserName(input);
    setInput("");
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleInput}
          type="text"
          placeholder="Enter GitHub username"
          value={input}
        />
        <button type="submit">Submit</button>
      </form>
      {Object.keys(githubUser).length > 0 && (
        <div className="githubUser-card">
          {githubUser.avatar_url && (
            <img src={githubUser.avatar_url} alt="avatar" />
          )}
          <h3>User Name: {githubUser.name}</h3>
          <p>{githubUser.bio}</p>
          <p>Number of Public Repositories: {githubUser.public_repos}</p>
          <p>Followers: {githubUser.followers}</p>
          <p>Following: {githubUser.following}</p>
          <h2>Repositories</h2>
          <ul>
            {repositories?.map((repo) => (
              <li key={repo.id}>
                <strong>{repo.name}</strong> {repo.description}
              </li>
            ))}
          </ul>
        </div>
      )}
      {error && <h1>{error}</h1>}
    </div>
  );
}

export default App;
