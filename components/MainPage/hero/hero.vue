<template lang="pug">
  section.hero
    ._container.container
      img(src="./img/main-bg.png")._bg
      img(src="./img/main-bg-mobile.png")._bg.-mobile
      app-button._btn(size="xxl") Хочу попробовать
</template>

<script>
import AppButton from "../../app/app-button/app-button";
export default {
  name: "Hero",
  components: {AppButton}
}
</script>

<style src="./hero.scss" lang="scss"></style>
