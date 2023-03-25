<template lang="pug">
  .course-progress
    img._decor-1(v-if="theme" :src="require(`~/assets/img/courses-theme/1/${theme}.png`)")
    ._title Твой прогресс
    template(v-if="maxTestResult > 0")
      ._items
        ._item
          ._text_rotate Пройдено уроков
          ._bar
            ._scale
            ._value(:style="`height: ${(150*(lessonsCompleted / 100)) - 6}px`") {{ lessonsCompleted }}%
        ._item
          ._text Средний балл
          ._circle
            ._number {{ averageResult }} баллов
      ._diagram
        div._test-level-wrapper(
          v-for="(test, idx) of tests"
          :style="`height: ${Math.round((test.result / maxTestResult) * 100)}%`"
        )
          ._test-level
          p {{ idx + 1 }}
        ._text-y {{ maxTestResult }} балл
        ._text-x тест
    div._empty(v-if="maxTestResult === 0")
      img(src="./img/empty.png")
      h1 Тут будут твои результаты
</template>

<script>
export default {
  name: "CourseProgress",
  props: {
    theme: {
      type: String,
      default: "",
      required: false,
    },
    lessonsCompleted: {
      type: Number,
      default: 0,
      required: false
    },
    tests: {
      type: Array,
      default: () => [],
      required: true,
    }
  },
  computed: {
    testCount: (state) => state.tests ? state.tests.length : 0,
    averageResult: (state) => Math.floor(state.tests.reduce((acc, element) => element.result + acc ,0) / state.tests.length),
    maxTestResult: (state) => state.tests.reduce((acc, testElement) => testElement.result > acc ? testElement.result : acc, 0)
  },
}
</script>

<style lang="scss" src="./course-progress.scss"></style>
