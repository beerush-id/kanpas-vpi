<script lang="ts">
  import type { DirectionX, DirectionY } from '@beerush/browser-utils';
  import { linkPopUpPosition, unlinkPopUp } from '@beerush/kanpas-core/utils';
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';

  export let xDir: DirectionX = 'between';
  export let yDir: DirectionY = 'below';
  export let role: 'popup' | 'tooltip' | 'overlay' = 'tooltip';
  export let trigger: 'hover' | 'click' | 'mixed' = 'hover';
  export let dismiss = false;
  export let align = 'center';
  export let delay = 0;
  export let active = false;
  export let performance = true;
  export let expanded = false;
  export let reset = false;

  let element: HTMLElement;
  let parent: HTMLElement;
  let overlay: HTMLElement;
  let attach = true;

  const dispatch = createEventDispatcher();

  let showDelay: number;
  const activate = () => {
    if (active) {
      return;
    }

    if (role === 'overlay') {
      parent.style.position = 'relative';
      element.classList.add('active');
      return;
    }

    if (showDelay) {
      clearTimeout(showDelay);
    }

    attach = true;

    if (delay) {
      showDelay = window.setTimeout(() => {
        linkPopUpPosition(parent, element, xDir, yDir);
        reactivate();
      }, delay);
    } else {
      showDelay = window.setTimeout(() => {
        linkPopUpPosition(parent, element, xDir, yDir);
        reactivate();
      }, 50);
    }
  };

  let deactivateQueue: number;
  const deactivate = () => {
    if (role === 'overlay') {
      element.classList.remove('active');
      dispatch('dismiss');
      return;
    }

    if (showDelay) {
      clearTimeout(showDelay);
    }

    if (role === 'popup') {
      deactivateQueue = window.setTimeout(() => {
        attach = false;

        if (element) {
          element.classList.remove('accept-sync');
        }

        if (!performance) {
          unlinkPopUp(parent, element);
        }

        dispatch('dismiss');
      }, 300);
    } else {
      attach = false;

      if (element) {
        element.classList.remove('accept-sync');
      }

      if (!performance) {
        unlinkPopUp(parent, element);
      }

      dispatch('dismiss');
    }

    active = false;
  };

  const reactivate = () => {
    active = true;

    setTimeout(() => {
      if (overlay) {
        document.body.appendChild(overlay);
      }
    }, 50);

    if (deactivateQueue) {
      clearTimeout(deactivateQueue);
    }
  };

  let deactivating: number;
  const deactivateMixed = () => {
    if (trigger === 'mixed') {
      deactivating = window.setTimeout(() => {
        deactivate();
      }, 500);
    }
  };
  const cancelDeactivateMixed = () => {
    if (trigger === 'mixed') {
      if (deactivating) {
        clearTimeout(deactivating);
      }
    }
  };

  const syncPos = () => {
    if (element) {
      element.classList.add('accept-sync');
    }
    activate();
  };

  onMount(() => {
    parent = element.parentElement as HTMLElement;

    if (parent) {
      if (trigger === 'hover' || trigger === 'mixed') {
        parent.addEventListener('mousemove', activate);
        parent.addEventListener('mouseleave', deactivate);

        if (trigger === 'hover') {
          parent.addEventListener('click', deactivate);
        } else {
          parent.addEventListener('click', syncPos);
        }
      } else if (trigger === 'click') {
        parent.addEventListener('click', activate);
      }
    }

    attach = false;
  });

  onDestroy(() => {
    if (element) {
      element.remove();
    }

    if (parent) {
      parent.removeEventListener('mousemove', activate);
      parent.removeEventListener('mouseleave', deactivate);
      parent.removeEventListener('click', syncPos);
    }
  });
</script>

{#if attach || !performance}
  {#if role === 'tooltip'}
    <span
      class="kanpas-tooltip x-{xDir} y-{yDir}"
      class:active
      bind:this={element}
      on:wheel|stopPropagation
      style="text-align: {align}">
      <slot/>
    </span>
  {:else if role === 'overlay'}
    <div class="kanpas-overlay kanpas-acrylic" bind:this={element} on:wheel|stopPropagation>
      <slot/>
    </div>
  {:else}
    <div
      class="kanpas-popup x-{xDir} y-{yDir}"
      class:active
      class:expanded
      class:reset
      bind:this={element}
      on:click={dismiss ? deactivate : () => null}
      on:keypress
      on:wheel|stopPropagation
      on:mouseenter={trigger === 'hover' || trigger === 'mixed' ? reactivate : null}
      on:mouseleave={trigger === 'hover' ? deactivate : null}>
      <slot/>
    </div>
  {/if}
  {#if active && (trigger === 'click' || trigger === 'mixed')}
    <div
      bind:this={overlay}
      class="kanpas-popup-overlay"
      on:mouseenter={deactivateMixed}
      on:mouseleave={cancelDeactivateMixed}
      on:keypress
      on:click|stopPropagation|preventDefault={deactivate}></div>
  {/if}
{/if}

<style lang="scss">
  .kanpas-tooltip,
  .kanpas-popup {
    position: fixed;
    z-index: 9999;
    transition: opacity 0.2s ease-in-out, margin 0.2s ease-in-out, visibility 0.2s ease-in-out;
    opacity: 0;
    visibility: hidden;

    &:not(.reset) {
      backdrop-filter: blur(var(--kanpas-acrylic-blur));
      background-color: var(--kanpas-color-acrylic);
    }

    &.active {
      opacity: 1;
      visibility: visible;
    }
  }

  .kanpas-popup:not(.reset) {
    padding: var(--kanpas-space-small);
    border-radius: var(--kanpas-radius);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);

    &:before {
      border-radius: var(--kanpas-radius);
    }

    &.expanded {
      padding: 0;
    }
  }

  .kanpas-overlay {
    position: absolute;
    top: 100%;
    left: 0;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease-in-out;
    margin-top: 0;

    &.active {
      margin-top: 8px;
      opacity: 1;
      visibility: visible;
    }
  }

  .kanpas-popup-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9998;
  }

  .kanpas-tooltip {
    padding: 8px 10px;
    font-size: var(--kanpas-font-subtitle);
    pointer-events: none;
    white-space: nowrap;
    border-radius: var(--kanpas-radius-small);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

    &.accept-sync {
      transition: all 0.2s ease-in-out;
    }

    &:before {
      border-radius: var(--kanpas-radius-small);
    }

    &.active {
      opacity: 1;
      visibility: visible;
    }
  }
</style>
