/**
 * 0 - 600px : Phone
 * 600 - 900px : Tablet portrait
 * 900 - 1200px : Tablet landscape
 * [1200 - 1800px] normal styles applied,
 * 1800+px : Big desktop
 */

export const media = {
  phone: '@media (max-width: 37.5em)', //600px
  tabPort: '@media (max-width: 56.25em)', //900px
  tabLand: '@media (max-width: 75em)', //1200px
  bigDesktop: '@media (min-width: 112.5em)' //1800px
}