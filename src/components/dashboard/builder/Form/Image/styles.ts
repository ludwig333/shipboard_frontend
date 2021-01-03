import styled from 'styled-components';

export const ImageWrapper = styled.div`
  width: 25rem;
  display: flex;
  border-radius: 7px 7px 7px 7px;
  background: #f2f5f7;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='7' ry='7' stroke='%238392ABFF' stroke-width='4' stroke-dasharray='10%2c10' stroke-dashoffset='23' stroke-linecap='round'/%3e%3c/svg%3e");
  &:hover {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='7' ry='7' stroke='%235850EBFF' stroke-width='4' stroke-dasharray='10%2c10' stroke-dashoffset='23' stroke-linecap='round'/%3e%3c/svg%3e");
    color: #5850eb;
    
    .action-btn {
      visibility: visible;
    }
  }
  .action-btn {
    position: absolute;
    right: 0;
    height: 3rem;
    width: 3rem;
    visibility: hidden;
    background-color: transparent;
    border: none;
    outline: none;

    svg {
      height: 2rem;
      width: 2rem;
      color: #8392ab;

      &:hover {
        color: red;
        cursor: pointer;
      }
    }
  }

  img {
    height: 100%;
    width: 100%;
  }

  form {
    width: 100%;
    min-height: 15rem;
    text-align: center;
    display: flex;

    input[type='file'] {
      display: none;
    }

    label {
      width: 100%;
      height: auto;
      margin: auto;
      cursor: pointer;

      svg {
        height: 2rem;
        width: 2rem;
      }
    }
  }
`;
