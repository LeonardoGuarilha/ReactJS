import React, {useState, useEffect} from "react";

import "./styles.css";
import api from './services/api'

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Desafio React ${Date.now()}`,
      url: "https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs",
      techs: "Node.js"
    })

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if(repositoryIndex >= 0) {
      repositories.splice(repositoryIndex, 1);
    }

    api.delete(`/repositories/${id}`)

    setRepositories([...repositories, repositoryIndex]);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <>
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
            </button>    
          </li>  
          </>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
