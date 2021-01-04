import styled from 'styled-components';

export const CardSlider = styled.div`
  position: relative;
  display: flex;

  &:hover {
    .action-btn {
      visibility: visible;
    }
    .navigation_btn {
      visibility: visible;
    }
  }

  .navigation_btn {
    background-color: #f2f5f7;
    border-radius: 5000px;
    height: 4rem;
    width: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.35);

    svg {
      width: 75%;
      height: 75%;
      color: #8392ab;
    }

    &:hover {
      svg {
        color: #5850ec;
      }
    }
  }
  .previous {
    position: absolute;
    left: 0;
    top: 50%;
    z-index: 200;
    visibility: hidden;
    margin-left: -2rem;
  }
  .next {
    position: absolute;
    right: 0;
    top: 50%;
    z-index: 200;
    visibility: hidden;
    margin-right: -2rem;
  }

  .action-btn {
    position: absolute;
    right: 0;
    margin-right: -3rem;
    height: 3rem;
    width: 3rem;
    visibility: hidden;
    background-color: transparent;
    border: none;
    outline: none;

    svg {
      height: 2rem;
      width: 2rem;
      color: #8392ab;

      &:hover {
        color: red;
        cursor: pointer;
      }
    }
  }
`;
export const CardWrapper = styled.div`
  box-shadow: 0px 4px 12px #95bbdf;
  border-radius: 12px;
  display: flex;
  flex-direction: column;

  .card-image {
    /* padding: 2rem; */
  }

  .card-text {
    .card-heading {
      padding: 1rem;
      padding-bottom: 0;
      padding-bottom: 0rem;
      font-size: 1.4rem;
      font-weight: 500;
      font-family: Roboto 'sans-serif';

      &:hover {
        background-color: #f2f5f7;
      }

      h3 {
        font-size: inherit;
        font-weight: inherit;
      }

      input {
        font-size: inherit;
        width: 100%;
        font-family: inherit;
        font-weight: inherit;

        &:focus {
          border: 1px solid #5850ec;
          outline: none;
        }
      }
    }

    .card-body {
      max-width: 25rem;
      font-size: 1.2rem;
      padding: 1rem;
      &:hover {
        background-color: #f2f5f7;
      }
    }
  }
`;
