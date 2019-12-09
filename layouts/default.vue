<template>
  <div class="page-wrapper">
    <header>
      <h1 class="page-title">Пятнашки</h1>
    </header>
    <nuxt class="content" />
    <footer class="creds">
      <p class="item">
        Made by
        <a href="https://github.com/perkthefox">perkthefox</a>
        😁
      </p>
      <p class="item">
        <a href="https://github.com/perkthefox/15puzzlegame">Clone this repo</a>
        😋
      </p>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.creds {
  padding: 0 1em;
    .item {
      text-align: right;
    }
}
</style>
