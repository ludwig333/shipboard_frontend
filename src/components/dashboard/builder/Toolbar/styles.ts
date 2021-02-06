import styled from 'styled-components';

export const ToolbarWrapper = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
  float: left;
  
`;

export const ToolbarMenu = styled.div`
  position: relative;
  width: 32rem;
  max-height: calc(100vh - 5rem);
  height: calc(100vh - 5rem);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #fdfdfd;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5rem;
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

  .flow-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5rem;
    width: 100%;
    padding: 1rem;
    background:	#FFE763;
    font-size: 1.6rem;
    font-weight: 500;
    font-family: Roboto, 'sans-serif';
    border: none;
  }

  .flow-content {
    position: relative;
    display:flex;
    justify-content:center;
    align-items:center;
    height: 6rem;
    border-radius: 7px;
    width: 100%;
    max-width: 24rem;
    padding: 2rem;
    border: 1px solid green;
    background: #f2f5f7;
    font-size: 1.6rem;
    font-weight: 500;
    font-family: Roboto, 'sans-serif';
    cursor: pointer;

    &:hover { 
      background: #FFE763;
    .action-btn {
      visibility: visible;
    }
  }
  }

  .action-btn {
    position: absolute;
    top: 0;
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
