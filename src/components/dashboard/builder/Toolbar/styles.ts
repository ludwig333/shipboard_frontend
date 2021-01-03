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
    height: 5rem;
    width: 100%;
    background: #e1e5ea;
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
