import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}

export const Title = styled.h1`
  font-size: 44px;
  color: #3a3a3a;
  line-height: 56px;
  max-width: 550px;
  margin: 0.8rem 0.4rem;
  @media (max-width: 720px) {
    font-size: 35px;
  }
`;

export const Form = styled.form<FormProps>`
  margin-top: 40px;
  max-width: 700px;
  display: flex;
  @media (max-width: 720px) {
    margin-top: 20px;
  }
  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 2px solid #fff;
    border-radius: 5px 0px 0px 5px;
    color: #3a3a3a;
    border-right: 0;
    ${(props) =>
      props.hasError &&
      css`
        border-color: red;
      `}
    &:placeholder {
      color: #a8a8b3;
    }
    @media (max-width: 720px) {
      height: 60px;
    }
  }
  button {
    width: 160px;
    background-color: #04d361;
    border-radius: 0px 5px 5px 0px;
    border: none;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.3seg;
    &:hover {
      background-color: ${shade(0.2, '#04d361')};
    }
  }
`;

export const Repos = styled.div`
  margin-top: 35px;
  max-width: 700px;
  div {
    display: flex;
    width: 100%;
    background: #fff;
    padding: 10px;
    margin-top: 1rem;
    border-radius: 5px;
    transition: transform 0.3s;
    &:hover {
      transform: translateX(6px);
    }
    @media (max-width: 720px) {
      width: 100%;
      justify-content: space-around;
    }
  }
  a {
    width: 100%;
    display: flex;
    align-items: center;
    @media (max-width: 720px) {
      padding: 10px;
    }
    &:hover {
      transform: translateX(6px);
    }
    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }
    div {
      margin: 0 16px;
      flex: 1;
      display: flex;
      flex-direction: column;
      strong {
        font-size: 20px;
        color: #3d3d4d;
      }
      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
        @media (max-width: 720px) {
          font-size: 15px;
        }
      }
    }
    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
  button {
    background-color: #fff;
    border: none;
    margin-left: 1rem;
    @media (max-width: 720px) {
      margin-left: 0;
    }
    svg {
      :hover {
        color: red;
      }
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: red;
  margin-top: 8px;
  font-weight: bold;
`;
