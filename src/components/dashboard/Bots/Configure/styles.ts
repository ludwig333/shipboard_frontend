import styled from 'styled-components';


export const ConfigureWrapper = styled.div`
  position: relative;
  img {
    height: 6rem;
    width: 6rem;
    position: absolute;
    top: 2rem;
    left: 2rem;
  }

  .modal-body {
    max-width: 60rem;
    min-width: 40rem;
  }

  .modal-content {
    padding: 0 4rem;
  }

  .configure-form{
    display: flex;
    flex-direction: column;
  }

  .form-group{
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    margin-bottom: 1rem;

    input {
      margin: 0;
      border-radius: 7px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
      min-height: 3.8rem;
      min-width: 30rem;
      padding: .8rem;
      outline: none;
      font-family: Roboto, sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 1.4rem;
      color: #000;
      width: 100%;
      background: #F7F7F7;
    }
    p{
      font-family: Roboto, sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 1.4rem;
    }
  }
`;