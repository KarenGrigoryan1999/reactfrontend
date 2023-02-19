<template lang="pug">
  .course-progress
    img._decor-1(v-if="theme" :src="require(`~/assets/img/courses-theme/1/${theme}.png`)")
    ._title Твой прогресс
    ._items
      ._item
        ._text_rotate Пройдено уроков
        ._bar
          ._scale
          ._value 50%
      ._item
        ._text Средний балл
        ._circle
          ._number 100 баллов
    ._diagram
      ._text-y балл
      ._text-x тест
</template>

<script>
export default {
  name: "CourseProgress",
  props: {
    theme: {
      type: String,
      default: "",
      required: false,
    }
  }
}
</script>

<style lang="scss" src="./course-progress.scss"></style>
