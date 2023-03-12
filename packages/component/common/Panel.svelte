<script lang="ts">
  import Icon from './Icon.svelte';

  export let title = '';
  export let icon = '';
  export let collapsible = false;
  export let collapsed = false;

  const toggle = () => {
    collapsed = !collapsed;
  };
</script>

<div class="kds-panel">
  {#if title}
    <div class="kds-panel-title flex-row-center-y">
      {#if icon}
        <Icon size="medium" class="kds-panel-head-icon mdr-10" on:click={toggle}>{icon}</Icon>
      {/if}
      {#if typeof title === 'string'}
        <span class="flex" on:click={toggle} on:keypress>{title}</span>
      {/if}
      <slot name="panel-head"/>
      {#if collapsible}
        <Icon
          class="mdl-10"
          tooltip={collapsed ? 'More' : 'Less'}
          clickable
          on:click={toggle}
        >{collapsed ? 'unfold_more' : 'unfold_less'}</Icon>
      {/if}
    </div>
  {/if}
  <slot name="panel-body"/>
  <div class="kds-panel-body" class:collapsed>
    <slot/>
  </div>
</div>

<style global lang="scss">
  .kds-panel {
    display: contents;

    .kds-panel-title:not(:last-child) {
      margin-bottom: var(--kds-space-small);
      user-select: none;
    }

    .kds-panel-head-icon {
      opacity: 0.8;
    }

    .kds-panel-section {
      justify-content: space-between;

      &:not(:last-child) {
        margin-bottom: var(--kds-space-small);
      }
    }

    .kds-panel-body.collapsed {
      display: none;
    }

    .kds-panel-prop-label {
      font-size: var(--kds-font-subtitle);
      opacity: 0.6;
      user-select: none;
    }

    .kds-vertical-separator {
      height: 18px;
      border-right: 1px solid var(--kds-color-line);
    }

    .kds-panel-input-wrap {
      position: relative;
      padding-right: 16px;

      .kds-panel-value-unit {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
    }

    .kds-panel-value-unit {
      font-size: 10px;
      opacity: 0.5;
      user-select: none;
    }

    select, input {
      height: 24px;
    }

    select {
      padding: 2px 8px;
    }

    input {
      padding: 2px 8px;
      text-align: center;
    }

    input:not([class]) {
      width: 56px;
    }

    input[type="number"] {
      padding-right: 0;
    }
  }
</style>
