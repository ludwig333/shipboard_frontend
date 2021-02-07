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
    p{
      font-family: Roboto, sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 1.4rem;
    }
  }
`;