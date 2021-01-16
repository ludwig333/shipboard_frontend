import { createGlobalStyle } from 'styled-components';
import { media } from './mediaQueries';

const GlobalStyle = createGlobalStyle`
*,
*::after,
*::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
}

html {
    // This defines what 1rem is
    font-size: 62.5%; //1 rem = 10px; 10px/16px = 62.5%

   ${media.tabLand} { // width < 1200?
        font-size: 56.25%; //1 rem = 9px, 9/16 = 50%
    }

    ${media.tabPort}{ // width < 900?
        font-size: 50%; //1 rem = 8px, 8/16 = 50%
    }

    ${media.bigDesktop} {
        font-size: 75%; //1rem = 12, 12/16
    }

}

body {
    background-color: #F7F9FF;
    box-sizing: border-box;
    color: #565252;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    line-height: 1.7;
    backface-visibility: hidden;
    overflow-x: hidden;

}
.form-error {
    font-size: 1rem;
    color: red;
}

.Toastify__toast-body {
    font-size: 1.6rem;
    font-family: "Roboto", sans-serif;
}

::selection {
    background-color: #5850EB;
    color: #ffffff;
}

`;

export default GlobalStyle;
