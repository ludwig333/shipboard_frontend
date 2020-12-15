import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 25rem;
`;

export const PaginationItem = styled.a<{ isActive?: number }>`
  width: 3rem;
  height: 3rem;
  border-radius: 0.8rem;
  background-color: ${(props) => (props.isActive === 1 ? '#5850eb' : '#fff')};
  color: ${(props) => (props.isActive === 1 ? '#fff' : '#000')};
  border: 1px solid #5850eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-left: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #5850eb;
    color: #fff;
  }

  svg {
    height: 2rem;
    width: 2rem;
  }
`;
