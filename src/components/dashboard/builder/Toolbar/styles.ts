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


  .close-toolbar{
    position: absolute;
    cursor: pointer;
    top: .5rem;
    right: .5rem;
    svg {
      width: 2rem;
      height: 2rem;
    }
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

export const BtnEditorWrapper = styled.div<{position?: string}>`
  background: #FDFDFD;
  width: 25rem;
  height: auto;
  position: absolute;
  top: 50%;
  left: 30rem;
  z-index: 3;
  border-radius: 7px 7px 7px 7px;
  box-shadow: 0px 4px 12px #95bbdf;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 2rem;
  transform: translate(0, -50%);

  .title {
    font-size: 1.4rem;
    font-family:  Roboto, sans-serif;
    font-weight: 400;
    background: #E1E5EA;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    position:relative;

    .close-editor{
      position:absolute;
      top: .5rem;
      right: .5rem;
      cursor: pointer;
      svg{
        width: 2rem;
        height: 2rem;
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    margin-top: 1.5rem;
    width: 85%;

    input {
      border-radius: 7px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
      height: 3rem;
      min-width: 18rem;
      outline: none;
      font-size: 1.4rem;
      font-family:  Roboto, sans-serif;
      font-weight: 400;
      padding: .8rem;
    }
  }
  .bottom {
      width: 80%;
      margin: auto;
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
  }

  .btn {
    padding:.7rem;
    font-size: 1.2rem;
    border:none;
    outline: none;
    cursor: pointer;

    &-done {
      background: #5850EB;
      color: white;

      &:active{
        background: gray;
      }
    }

    &-delete {
      background:red;
      color:white;
    }

    &:active{
        background: gray;
      }
  }

  .btn-div {
    position:relative;
    background: #EEF1F4;
    height: 5rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content:space-evenly;
    align-items:center;
    padding: .5rem;
    border-radius: 12px 12px 12px 12px;
    border: 1px dashed #5850eb;
    cursor: pointer;

    &:hover{
      background: #95bbdf
    }

    .btn-label {
      display: flex;
      flex-direction: column;
      justify-content:center;
      align-items: center;
    }

    .remove-btn {
      position:absolute;
      top: 1rem;
      right: -3rem;
      padding: .5rem;
      display: flex;
      justify-content:center;
      align-items:center;
      background: #EEF1F4;
      margin-right: 2rem;
    }
  }

`;