export function portal(self: HTMLElement, slot: HTMLElement | string) {
  const update = (newSlot: HTMLElement | string) => {
    if (newSlot instanceof HTMLElement) {
      newSlot.appendChild(self);
    } else {
      const parent = document.querySelector(newSlot);

      if (parent) {
        parent.appendChild(self);
      }
    }
  };

  const destroy = () => {
    if (self.parentNode) {
      self.parentNode.removeChild(self);
    }
  };

  update(slot);

  return { update, destroy };
}
