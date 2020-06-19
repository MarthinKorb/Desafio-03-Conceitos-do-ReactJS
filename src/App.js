import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {

  const [repositories, setRepositories] = useState([]);

  const [likes, setLikes] = useState(0);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repository - ${Date.now()}`,
      url: "https://github.com/MarthinKorb/Desafio-03-Conceitos-do-ReactJS",
      techs: ["React", "React Native", "NodeJS"],
    });

    setRepositories([...repositories, response.data]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  async function handleLikeRepository(id) {
    const { data } = await api.post(`repositories/${id}/like`)
    setRepositories(
      repositories.map(repository => repository.id === id ? data : repository)
    )
  }

  async function handleUnLikeRepository(id) {
    const { data } = await api.post(`repositories/${id}/unlike`)
    setRepositories(
      repositories.map(repository => repository.id === id ? data : repository)
    )
  }

  return (
    <section className="container">

      <header><h1>Listagem de Repositórios</h1></header>
      <div>
        <ul data-testid="repository-list">
          {repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}

              <button className="btnDelete" onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>

              <button className="btnLike" onClick={() => handleLikeRepository(repository.id)}>Like</button>

              <button className="btnUnlike" onClick={() => handleUnLikeRepository(repository.id)}>Unlike</button>
              <h4>{repository.likes} curtidas</h4>
            </li>
          ))
          }

        </ul>

        <button  onClick={handleAddRepository}>Adicionar</button>
      </div>
    </section>
  );
}

export default App;