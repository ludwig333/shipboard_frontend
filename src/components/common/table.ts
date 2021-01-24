
import styled from 'styled-components';

export const TableWrapper = styled.ul`
    a {
      text-decoration: none;
      font-family: "Roboto", sans-serif;
      font-weight: 400;
      font-size: 1.4rem;

      &:visited, :hover, :active, :link{
          color: black;
      }
    }

    li {
    border-radius: 3px;
    padding: 25px 30px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
  }
  .table-header {
    text-transform: uppercase;
    letter-spacing: 0.03em;
    font-weight: bold;
  }
  .table-row {
    background-color: #ffffff;
    box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);
    &:hover{
      box-shadow: 0px 0px 9px 0px rgba(80,88,235,2)
    }
  }
  .flex-basis-10 {
    flex-basis: 10%;
  }
  .flex-basis-20 {
    flex-basis: 20%;
  }
  .flex-basis-30 {
    flex-basis: 30%;
  }
  .flex-basis-40 {
    flex-basis: 40%;
  }
  .flex-basis-50 {
    flex-basis: 50%;
  }
  .flex-basis-60 {
    flex-basis: 60%;
  }
  .flex-basis-70 {
    flex-basis: 70%;
  }
  
  @media all and (max-width: 767px) {
    .table-header {
      display: none;
    }
    .table-row{
      
    }
    li {
      display: block;
    }
    .col {
      
      flex-basis: 100%;
      
    }
    .col {
      display: flex;
      padding: 10px 0;
      &:before {
        color: #6C7A89;
        padding-right: 10px;
        content: attr(data-label);
        flex-basis: 50%;
        text-align: right;
      }
    }
  }
`;
