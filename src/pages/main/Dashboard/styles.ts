import styled from 'styled-components';

export const TilesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10rem;
  margin-bottom: 5rem;

  .tile{
    display:flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
    width: 15rem;
    margin: 2rem;
    background: #FFFFFF;
    border-radius: 15px;
    cursor: pointer;
    box-shadow: 0px 0px 9px 0px rgba(80,88,235,2);

    p {
      font-size: 1.2rem;
      font-weight: 400;
      font-family: Roboto, 'sans-serif';
    }
  }
`;