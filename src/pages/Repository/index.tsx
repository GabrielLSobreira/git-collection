import { Header, Issues, RepoInfo } from './styles';
import { useParams, Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { api } from '../../services/api';
import { useEffect, useState } from 'react';

interface RepositoryParams {
  repository: string;
}

interface GitHubRepository {
  full_name: string;
  description: string;
  forks_count: number;
  open_issues_count: number;
  stargazers_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface GitHubIssue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

export const Repository: React.FC = () => {
  const [repo, setRepo] = useState<GitHubRepository | null>(null);
  const [issues, setIssues] = useState<GitHubIssue[]>([]);
  const { repository } = useParams<RepositoryParams>();

  useEffect(() => {
    api.get(`repos/${repository}`).then((response) => setRepo(response.data));
    api
      .get(`repos/${repository}/issues`)
      .then((response) => setIssues(response.data));
  }, [repository]);

  return (
    <>
      <Header>
        <img src={logo} alt="GitCollection" />
        <Link to="/">
          <FiChevronLeft />
          Voltar
        </Link>
      </Header>
      {repo && (
        <RepoInfo>
          <header>
            <img src={repo.owner.avatar_url} alt={repo.owner.login} />
            <div>
              <strong>{repo.full_name}</strong>
              <p>{repo.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repo.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repo.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repo.open_issues_count}</strong>
              <span>Issues</span>
            </li>
          </ul>
        </RepoInfo>
      )}
      <Issues>
        {issues.map((issue) => (
          <a
            href={issue.html_url}
            key={issue.id}
            rel="noreferrer"
            target={'_blank'}
          >
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};
