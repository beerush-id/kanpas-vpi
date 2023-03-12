import { type DirectionX, type DirectionY, popTo, restore } from '@beerush/browser-utils';

export function unlinkPopUp(parent: HTMLElement, element: HTMLElement, delay = 200) {
  return restore({ element, parent }, delay);
}

export function linkPopUpPosition(
  parent: HTMLElement,
  element: HTMLElement,
  xDir: DirectionX,
  yDir: DirectionY
) {
  return popTo('#kds-popup', { element, parent, xDir, yDir });
}
