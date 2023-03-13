<script lang="ts">
  import { Button, Input, Panel, PopUp } from '@common';
  import '@styles/main.scss';
  import { portal } from '@actions';

  let count = 0;
  const todos = [ 'a', 'b', 'c' ];
</script>

<div class="p-md">
  <h1 class="text-neutral">Web</h1>
  <section>
    <Button color="primary" on:click={() => count += 1}>
      clicked: {count} times
      <PopUp xDir="after" yDir="between">Test</PopUp>
    </Button>
  </section>
  <section class="flex-row">
    <div class="block">
      {#each todos as todo}
        <Input placeholder="Testing"/>
      {/each}
    </div>
    <Panel title="Test">

    </Panel>
  </section>

  <div use:portal={'.kds-portal'}>Should be moved to portal slot.</div>

  <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</div>
