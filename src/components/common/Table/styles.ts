import styled from 'styled-components';

export const TableHeader = styled.table`
  color: #000000;
  display: flex;
  font-family: Roboto, sans-serif;
  font-size: 1.6rem;
  font-weight: 400;
`;

export const TableWrapper = styled.div`
  margin: 4rem;

  .table-row {
    color: #000;
    font-size: 1.5rem;
    font-family: Roboto;
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;

    &-data {
      width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    background: #ffffff;
    border-radius: 7px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    height:5rem;
    }
  }

  .table-col{
    &-1 {
      flex:1
    }
    &-2 {
      flex:3
    }
    &-3 {
      flex:3
    }

  }

  .table {
    display: flex;
    flex-flow: column nowrap;
    font-size: 1.6rem;
    margin: 1rem;
    line-height: 1.5;
    border-bottom: 1px solid #d0d0d0;
    flex: 1 1 auto;
  }

  .th {
    display: none;
    font-weight: 700;
    background-color: #f2f2f2;
  }

  .th > .td {
    white-space: normal;
    justify-content: center;
  }

  .tr {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    background: #ffffff;
    border-radius: 7px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    margin-bottom: 1rem;
  }

  .td {
    display: flex;
    flex-flow: row nowrap;
    flex-grow: 1;
    flex-basis: 0;
    padding: 0.5em;
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0px;
    white-space: nowrap;
    border-bottom: 1px solid #d0d0d0;
  }
`;
