<template lang="pug">
  section.start-free(v-if="showButton")
    ._container.container
      ._wrapper
        img._decor-1(src="./img/start-free-decor1.svg", alt="")
        img._decor-2(src="./img/start-free-decor2.svg", alt="")
        ._woman-box
          img._image(src="./img/woman-back.png", alt="")
          a._link(@click="setFreeCourseModalStatus(true, course.id)") Начни курс бесплатно
</template>

<script>
export default {
  name: "StartFree",
  props: {
    course: {
      required: true,
      type: Object,
      default: {}
    }
  },
  computed: {
    id: state => state.$route.params.id,
    showButton: (state) => state.currentUser ? !Boolean(state.currentUser.courses.find((element) => element.id === state.course.id)) : false
  }
}
</script>

<style lang="scss" src="./start-free.scss"></style>
