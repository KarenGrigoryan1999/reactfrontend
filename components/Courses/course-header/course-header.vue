<template lang="pug">
  section.course-header
    ._container.container
      ._desk-box
        img._desk(src="./img/desk.svg")
        img._girl(src="./img/girl-bag-plane.svg", alt="")
        ._info
          ._title {{ course ? course.name : '' }}
          ._text {{ course.lessons.length }} {{ declination(course.lessons.length, ["урок", "урока", "уроков"]) }}
          ._text Задания для практики
          ._text {{ course.description }}
      button.btn.btn_reset._btn Хочу попробовать
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
  }
}
</script>

<style lang="scss" src="./course-header.scss"></style>
