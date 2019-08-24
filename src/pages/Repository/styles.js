import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Filter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;

  input {
    margin-right: 7px;
  }

  label {
    margin-right: 25px;
  }
`;

export const PageController = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    width: 45px;
    height: 45px;
    font-size: 15px;
    border: 1px solid #333;
    color: #333;
    padding-left: 17px;
  }
  button {
    background: #7159c1;
    color: #fff;
    border: none;
    padding: 15px;
    font-size: 15px;
    margin: 0 15px;

    &:disabled {
      background: rgba(0, 0, 0, 0.07);
    }
  }
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    text-decoration: none;
    color: #7159c1;
    font-size: 16px;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssuesList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #070;
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;
