<template lang="pug">
  section.start
    ._container.container
      ._content
        img(src="./img/start-bg.png")._bg
        img(src="./img/start-balloon.png")._balloon
        ._content-inner
          ._subtitle.subtitle Начни бесплатно сейчас
          h2._caption.caption
            span s
            span t
            span a
            span r
            span t
            br/
            span f
            span r
            span e
            span e
            br/
            span n
            span o
            span w
          button._btn.btn.btn_reset(@click="goToCourses") Начать
      img(src="./img/start-decor-1.svg")._decor-1
      img(src="./img/start-decor-2.svg")._decor-2
      img(src="./img/start-decor-3.svg")._decor-3

</template>

<script>
export default {
  name: "Start",
  methods: {
    goToCourses() {
      this.setFreeCourseModalStatus(true);
    }
  }
}
</script>

<style lang="scss" src="./start.scss"></style>
