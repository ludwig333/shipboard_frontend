import styled from 'styled-components';

export const GridWrapper = styled.div`
  max-width: 144rem; 
  a {
      text-decoration: none;
      font-family: "Roboto", sans-serif;
      font-weight: 400;
      font-size: 1.4rem;

      &:visited, :hover, :active, :link{
          color: black;
      }
    }
    
  .grid-row {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

.grid-item {
  height: 20rem;
  min-width: 20rem;
  flex-basis: 20%;
  width: 25rem;
  position: relative;
  padding: 1rem;
  box-sizing: border-box;
}

.grid-item-wrapper {
  -webkit-box-sizing: initial;
  -moz-box-sizing: initial;
  box-sizing: initial;
  background: #E1E5EA;
  margin: 0;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  -webkit-transition: padding 0.15s cubic-bezier(0.4,0,0.2,1), margin 0.15s cubic-bezier(0.4,0,0.2,1), box-shadow 0.15s cubic-bezier(0.4,0,0.2,1);
  transition: padding 0.15s cubic-bezier(0.4,0,0.2,1), margin 0.15s cubic-bezier(0.4,0,0.2,1), box-shadow 0.15s cubic-bezier(0.4,0,0.2,1);
  position: relative;
  box-shadow: 0px 0px 9px 0px rgba(0,0,1,.2);
  &:hover{
    box-shadow: 0px 0px 9px 0px rgba(80,88,235,2)
  }
}

.fixed-width {
  width: 15rem;
}

.small-height {
  height: 5rem;
}

.grid-item-container {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  .image {
    background-color: #E1E5EA;
    height: 15rem;

    img {
      max-width: 100%;
      height: auto;
    }
  }

  .tag {
    height: 5rem;
    display: flex;
    justify-content:space-between;
    align-items: center;
    background-color: white;
    padding: 0 1rem;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 1.2rem;
    border-radius: 12px;
  }
}

.grid-item:hover .grid-item-wrapper {
  padding: 2% 2%;
  margin: -2% -2%;
}

@media(max-width: 1333px) {
  .grid-item {
    flex-basis: 33.33%;
  }
}

@media(max-width: 1073px) {
   .grid-item {
    flex-basis: 33.33%;
  }
}

@media(max-width: 815px) {
  .grid-item {
    flex-basis: 50%;
  }
}

@media(max-width: 620px) {
  .col {
    clear: both;
    float: none;
    margin-left: auto;
    margin-right: auto;
    width: auto !important;
  }
}

@media(max-width: 555px) {
  .grid-item {
    flex-basis: 100%;
  }
}
`;