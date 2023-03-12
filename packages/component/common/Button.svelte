<script lang="ts">
  import { forwardEventsBuilder } from '@smui/common/internal';
  import { get_current_component } from 'svelte/internal';

  export let href = '';
  export let color: 'neutral' | 'primary' | 'positive' | 'negative' | 'destructive' = 'neutral';
  export let variant: 'flat' | 'borderless' | 'outline' | 'icon' = 'flat';
  export let disabled = false;

  let className = '';
  export { className as class };

  const forwardEvents = forwardEventsBuilder(get_current_component());
</script>

<svelte:element
  this={href && !disabled ? 'a' : 'button'}
  role={href && !disabled ? 'button' : undefined}
  href={href && !disabled ? href : undefined}
  class="{variant} {color} {className}"
  on:*
  use:forwardEvents
  {...$$restProps}>
  <slot/>
</svelte:element>

<style lang="scss"></style>
