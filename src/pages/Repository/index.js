/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import api from '../../services/api';

import { Loading, Owner, IssuesList, Filter, PageController } from './styles';
import Container from '../../components/Container';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repositoryName: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: '',
    issues: [],
    loading: true,
    filter: 'all',
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { filter, page } = this.state;

    const repoName = decodeURIComponent(match.params.repositoryName);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filter,
          per_page: 5,
          page,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  handleFilterChoice = e => {
    const { value } = e.target;
    const { page } = this.state;
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repositoryName);

    this.setState({ filter: value }, async () => {
      const { filter } = this.state;
      const response = await api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filter,
          per_page: 5,
          page,
        },
      });

      this.setState({ issues: response.data });
    });
  };

  handlePageChange = direction => {
    const { page, filter } = this.state;
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repositoryName);

    if (direction === 'back') {
      this.setState({ page: page - 1 }, async () => {
        const response = await api.get(`/repos/${repoName}/issues`, {
          params: {
            state: filter,
            per_page: 5,
            page,
          },
        });
        this.setState({ issues: response.data });
      });
    } else {
      this.setState({ page: page + 1 }, async () => {
        const response = await api.get(`/repos/${repoName}/issues`, {
          params: {
            state: filter,
            per_page: 5,
            page,
          },
        });
        this.setState({ issues: response.data });
      });
    }
  };

  render() {
    const { repository, issues, loading, filter, page } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Return to repositories</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <Filter>
          <input
            id="all"
            type="radio"
            value="all"
            name="status"
            checked={filter === 'all'}
            onClick={e => this.handleFilterChoice(e)}
          />
          <label htmlFor="all">All issues</label>
          <input
            id="open"
            type="radio"
            value="open"
            name="status"
            checked={filter === 'open'}
            onClick={e => this.handleFilterChoice(e)}
          />
          <label htmlFor="open">Open issues</label>
          <input
            id="closed"
            type="radio"
            value="closed"
            name="status"
            checked={filter === 'closed'}
            onChange={e => this.handleFilterChoice(e)}
          />
          <label htmlFor="closed">Closed issues</label>
        </Filter>

        <IssuesList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssuesList>

        <PageController>
          <button
            type="button"
            disabled={page === 1}
            onClick={() => this.handlePageChange('back')}
          >
            <FaChevronLeft />
          </button>
          <input type="number" disabled value={page} />
          <button type="button" onClick={() => this.handlePageChange('next')}>
            <FaChevronRight />
          </button>
        </PageController>
      </Container>
    );
  }
}
