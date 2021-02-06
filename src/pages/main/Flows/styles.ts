import styled from 'styled-components';

export const FlowBuilderWrapper = styled.div`
  position: absolute;
  .header {
    display: flex;
    align-items: center;
    height: 5rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
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
