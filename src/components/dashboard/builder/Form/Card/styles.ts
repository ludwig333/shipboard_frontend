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
    border-radius: 7px 7px 7px 7px;
  }

  .card-text {
    .card-heading {
      padding: 0.8rem;
      font-size: 1.4rem;
      font-weight: 500;
      font-family: Roboto, 'sans-serif';

      &:hover {
        background-color: #f2f5f7;
      }

      &.active {
        background-color: #f2f5f7;
      }

      .card-title {
        font-size: 1.4rem;
        font-weight: 500;
        width: 100%;
        font-family: Roboto, 'sans-serif';
        backface-visibility: hidden;
        border-radius: 7px 7px 7px 7px;
        border: none;
        outline: none;
        padding: 0.5rem;

        &:focus {
          border: none;
          outline: none;
        }
      }
    }

    .card-body {
      max-width: 25rem;
      padding: .8rem;
      font-size: 1.2rem;
      font-weight: 400;
      font-family: Roboto, 'sans-serif';
      margin-top: -1rem;

      &:hover {
        background-color: #f2f5f7;
      }

      &.active {
        background-color: #f2f5f7;
      }

      .card-paragraph {
        border: none;
        outline: none;
        width: 100%;
        font-size: 1.2rem;
        font-weight: 400;
        font-family: Roboto, 'sans-serif';
        backface-visibility: hidden;
        border-radius: 7px 7px 7px 7px;
        padding: 0.5rem;
      }
    }
  }
`;
