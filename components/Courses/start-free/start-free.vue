<template lang="pug">
  section.start-free
    ._container.container
      ._wrapper
        img._decor-1(src="./img/start-free-decor1.svg", alt="")
        img._decor-2(src="./img/start-free-decor2.svg", alt="")
        ._woman-box
          img._image(src="./img/woman-back.png", alt="")
          a._link(@click="setFreeModalStatus(true, id)") Начни курс бесплатно
</template>

<script>
export default {
  name: "StartFree",
  computed: {
    id: state => state.$route.params.id
  }
}
</script>

<style lang="scss" src="./start-free.scss"></style>
