<header class="kds-header flex-row-center-y px-sm">
  <section class="py-xs kds-header-logo">
    <slot name="logo" />
  </section>
  <section class="py-xs ml-sm kds-header-menu">
    <slot name="menu" />
  </section>
  <div class="flex" />
  <section class="py-xs kds-header-auth">
    <slot name="auth" />
  </section>
</header>

<style lang="scss">
  .kds-header {
    height: var(--kds-header-height);
  }
</style>
