<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { Header } from '@beerush/kanpas-component/layout';

  export let data: any;

  const getRenderContext = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    // const component = get_current_component();
    console.log(target.__svelte_meta?.loc);
  };

  if (typeof window !== 'undefined') {
    onMount(() => {
      console.log(data);
      document.addEventListener('click', getRenderContext);
    });

    onDestroy(() => {
      document.removeEventListener('click', getRenderContext);
    });
  }
</script>

<Header>
  <svelte:fragment slot="logo">
    <a href="/">Kanpas</a>
  </svelte:fragment>
</Header>
<main class="kds-main">
  <slot />
</main>
