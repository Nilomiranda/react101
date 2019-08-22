import React, { Component } from 'react';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import { Container, Form, SubmitButton } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
  };

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    this.setState({ loading: true });

    e.preventDefault();
    const { newRepo, repositories } = this.state;

    const response = await api.get(`repos/${newRepo}`);

    const data = {
      name: response.data.full_name,
    };

    this.setState({
      repositories: [...repositories, data],
      newRepo: '',
      loading: false,
    });
  };

  render() {
    const { newRepo, loading } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositories
        </h1>

        <Form onSubmit={e => this.handleSubmit(e)}>
          <input
            type="text"
            placeholder="Add repository"
            value={newRepo}
            onChange={e => this.handleInputChange(e)}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}

// function Main() {
//   return (
//     <Container>
//       <h1>
//         <FaGithubAlt />
//         Repositories
//       </h1>

//       <Form onSubmit={() => {}}>
//         <input type="text" placeholder="Add repository" />

//         <SubmitButton>
//           <FaPlus color="#FFF" size={14} />
//         </SubmitButton>
//       </Form>
//     </Container>
//   );
// }

// export default Main;
