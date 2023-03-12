<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  const getRenderContext = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    // const component = get_current_component();
    console.log(target.__svelte_meta?.loc);
  };

  if (typeof window !== 'undefined') {
    onMount(() => {
      document.addEventListener('click', getRenderContext);
    });

    onDestroy(() => {
      document.removeEventListener('click', getRenderContext);
    });
  }
</script>
<main class="kds-main">
  <slot></slot>
</main>
