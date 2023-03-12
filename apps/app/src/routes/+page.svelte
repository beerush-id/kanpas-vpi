<script lang="ts">
  import { Button, Input, PopUp } from '@beerush/kanpas-component';
  import { portal } from '@beerush/kanpas-component/actions';
  import '@beerush/kanpas-component/styles/main.scss';

  let count = 0;
  const todos = [ 'a', 'b', 'c' ];
</script>

<div class="p-medium">
  <h1 class="fg-destructive">Web</h1>
  <section>
    <Button color="primary" on:click={() => count += 1}>
      clicked: {count} times
      <PopUp>Test</PopUp>
    </Button>
  </section>
  <section class="flex-row">
    <div class="block">
      {#each todos as todo}
        <Input placeholder="Testing"/>
      {/each}
    </div>
  </section>

  <div use:portal={'.kds-portal'}>Should be moved to portal slot.</div>

  <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</div>
