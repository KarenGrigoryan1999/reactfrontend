<template lang="pug">
  section.course-header
    ._container.container
      ._desk-box
        img._desk(src="./img/desk.svg")
        img._girl(src="./img/girl-bag-plane.svg", alt="")
        ._info
          ._title {{ course ? course.name : '' }}
          ._text.price Цена курса: {{ course && course.price }} руб
          ._text {{ course.lessons.length }} {{ declination(course.lessons.length, ["урок", "урока", "уроков"]) }}
          ._text Задания для практики
          ._text {{ course.description }}
      button.btn.btn_reset._btn(v-if="showButton" @click="setFreeCourseModalStatus(true, course.id)") Хочу попробовать
</template>

<script>
export default {
  name: "CourseHeader",
  props: {
    course: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  computed: {
    showButton: (state) => state.currentUser ? !Boolean(state.currentUser.courses.find((element) => element.id === state.course.id)) : false
  }
}
</script>

<style lang="scss" src="./course-header.scss"></style>
