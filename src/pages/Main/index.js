import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: false,
    errorMessage: '',
  };

  // load local storage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // update local storage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    try {
      this.setState({ loading: true });

      e.preventDefault();
      const { newRepo, repositories } = this.state;

      const existingRepository = repositories.filter(
        repository => repository.name === newRepo
      );

      if (existingRepository.length > 0) {
        throw new Error('Duplicated repository');
      }

      const response = await api.get(`repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
        error: false,
        errorMessage: '',
      });
    } catch (err) {
      if (err.message === 'Duplicated repository') {
        this.setState({
          loading: false,
          error: true,
          errorMessage: err.message,
        });
        return;
      }
      console.log(err, err.message);
      if (err.message === 'Request failed with status code 404') {
        this.setState({
          loading: false,
          error: true,
          errorMessage: 'Repository not found',
        });
      }
      this.setState({ loading: false, error: true });
    }
  };

  render() {
    const { newRepo, loading, repositories, error, errorMessage } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositories
        </h1>

        <Form onSubmit={e => this.handleSubmit(e)} error={error}>
          <div className="form-control">
            <input
              type="text"
              placeholder="Add repository"
              value={newRepo}
              onChange={e => this.handleInputChange(e)}
            />
            <span>{errorMessage}</span>
          </div>

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Details
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
