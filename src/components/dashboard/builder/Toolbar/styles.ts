import styled from 'styled-components';

export const ToolbarWrapper = styled.div`
  display: flex;
  position: relative;
  z-index: 2;
  float: left;
`;

export const ToolbarMenu = styled.div`
  position: relative;
  width: 32rem;
  max-height: 91vh;
  height: 91vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #fdfdfd;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  overflow-y: scroll;

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 8rem;
    width: 100%;
    padding: 1rem;
    background: #e1e5ea;
  }

  .heading-input {
    font-size: 1.6rem;
    font-weight: 500;
    font-family: Roboto, 'sans-serif';
    border: none;
    outline: none;
    width: 100%;
    text-align: center;
    border-radius: 7px 7px 7px 7px;
    min-width: 25rem;
    padding: .5rem;

    &:focus {
      border: none;
      outline: none;
    }
  }

  .no-content-text {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 500;
    font-family: Roboto, 'sans-serif';
    height: 5rem;
    width: 20rem;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='7' ry='7' stroke='%238392ABFF' stroke-width='4' stroke-dasharray='10%2c10' stroke-dashoffset='23' stroke-linecap='round'/%3e%3c/svg%3e");
  }
`;

export const ToolbarButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: auto;
  margin-bottom: 1rem;
`;
