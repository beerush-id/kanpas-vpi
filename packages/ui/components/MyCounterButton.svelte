<script lang="ts">
  let count = 0;

  function handleClick() {
    count += 1;
  }
</script>

<button class="primary" on:click="{handleClick}">
  clicks count: {count}
</button>
