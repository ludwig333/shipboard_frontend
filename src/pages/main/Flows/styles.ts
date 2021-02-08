import styled from 'styled-components';

export const FlowBuilderWrapper = styled.div`
  position: absolute;
  .header {
    display: flex;
    align-items: center;
    height: 5rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);

    p {
      font-family: Roboto, sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 1.6rem;
      margin-left: 5rem;
    }
  }
  .stage-action {
    position: absolute;
    top: 6rem;
    right: 2rem;
    z-index: 2;
    svg {
      height: 4rem;
      width: 4rem;
      fill: #eef1f4;
      background-color: #5850eb;
      cursor: pointer;
      border-radius: 7px;
    }
  }
`;


export const PlatformWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10rem;
  margin-bottom: 5rem;

  .platform_btn{
    display:flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
    width: 25rem;
    margin: 2rem;
    background: #FFFFFF;
    border-radius: 15px;
    cursor: pointer;

    &:hover{
      box-shadow: 0px 0px 9px 0px rgba(80,88,235,2);
      background: #F7F7F7;
    }

    img {
      width: 7rem;
      height: auto;
      margin-left: -3rem;
    }
    p {
      font-family: Roboto, sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 1.4rem;
    }
  }
`;
