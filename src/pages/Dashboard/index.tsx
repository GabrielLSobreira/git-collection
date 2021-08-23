import { Title, Form, Repos, Error } from './styles';
import logo from '../../assets/logo.svg';
import { FiChevronRight, FiTrash2 } from 'react-icons/fi';
import { api } from '../../services/api';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

interface GitHubRepository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export const Dashboard: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepository[]>(() => {
    const storageRepos = localStorage.getItem('@GitCollection:repositories');
    if (storageRepos) {
      return JSON.parse(storageRepos);
    }
    return [];
  });
  const [newRepo, setNewRepo] = useState('');
  const [error, setError] = useState('');
  const formEl = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    localStorage.setItem('@GitCollection:repositories', JSON.stringify(repos));
  }, [repos]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setNewRepo(event.target.value);
  }

  async function handleAddRepo(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    if (!newRepo) {
      setError('Informe o username/repositório.');
      return;
    }
    try {
      const response = await api.get<GitHubRepository>(`repos/${newRepo}`);
      const repository = response.data;
      setRepos([...repos, repository]);
      setError('');
    } catch (error) {
      setError('Repositório não encontrado no GitHub. Digite novamente.');
    } finally {
      formEl.current?.reset();
      setNewRepo('');
    }
  }

  function handleClick(repository: GitHubRepository) {
    setRepos(repos.filter((rep) => rep.full_name !== repository.full_name));
  }

  return (
    <>
      <img src={logo} alt="GitCollection" />
      <Title>Catálogo de repositórios do GitHub</Title>
      <Form hasError={Boolean(error)} onSubmit={handleAddRepo} ref={formEl}>
        <input
          type="text"
          placeholder="username/repository_name"
          value={newRepo}
          onChange={handleInputChange}
        />
        <button type="submit">Buscar</button>
      </Form>
      {error && <Error>{error}</Error>}

      <Repos>
        {repos.map((repository, index) => (
          <div key={repository.full_name + index}>
            <Link to={`/repositories/${repository.full_name}`}>
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
              />
              <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
              </div>
              <FiChevronRight size={25} />
            </Link>
            <button onClick={() => handleClick(repository)}>
              <FiTrash2 size={22} />
            </button>
          </div>
        ))}
      </Repos>
    </>
  );
};
