<template lang="pug">
  section.courses
    ._container.container
      ._head
        h2._caption.caption
          .caption_rotate
            span O
            span n
            span l
            span i
            span n
            span e
          ._caption-text.caption__text
            span C
            span o
            span u
            span r
            span s
            span e
            span s
        ._subtitle.subtitle Онлайн-курсы
      ul._list
        li._item(v-for="course in courses")
          svg(xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 288.8 504.9")._door
            path._canvas(:fill="course.color" d="M273.6,31c1.4,160.6,0.1,225.9,0.1,225.9l0.8,137.1l0.3,93.3l-246.3,3.1C5.9,308.3,8,308.1,5.3,209.8c-2.7-99.3-2.8-72.4-2.5-114.3C3.2,53.6,5.6,8.8,5.6,8.8s49.2-4.1,106.6-5.7s79.7,1.8,120,3.5s41.3,3.2,41.3,3.2")
            path._countur(d="M273.6,31c1.4,160.6,0.1,225.9,0.1,225.9l0.8,137.1l0.3,93.3l-246.3,3.1C5.9,308.3,8,308.1,5.3,209.8c-2.7-99.3-2.8-72.4-2.5-114.3C3.2,53.6,5.6,8.8,5.6,8.8s49.2-4.1,106.6-5.7c57.4-1.6,79.7,1.8,120,3.5c40.3,1.7,41.3,3.2,41.3,3.2")
            path._countur(d="M270.3,10.1l8.9,17.4c1.9,43.3,6.8,470.4,6.8,470.4s-65.3,2.7-128,3.8c-62.6,1-122.5,0.3-122.5,0.3l-11.5-11.5")
            path._countur.-inner(d="M32.1,22.3l104-3.1l100.4,0.6")
            path._countur.-inner(d="M250.9,23.9l1.2,210.5")
            path._countur.-inner(d="M249.9,305.1l3.7,166.4")
            path._countur.-inner(d="M243.6,469l-204.4,1.3")
            path._countur.-inner(d="M37.1,442.1c1.5,4.8-10.1-85.4-13.9-188.9S19.5,18.8,19.5,18.8")
            path._countur.-inner(d="M207.2,270.9c0-8.4,6.8-15.2,15.1-15.2c8.3,0,15.1,6.8,15.1,15.2s-6.8,15.2-15.1,15.2C213.9,286.1,207.2,279.3,207.2,270.9z")
          ._cabinet-name {{ course.cabinet }}
          ._btns
            nuxt-link(:to="`/courses/${course.id}`" tag="button").btn.btn_reset._btn Посмотреть курс
            //button.btn.btn_reset._btn Добавить в корзину
</template>

<script>
export default {
  name: "Courses",
  props: {
    courses: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
}
</script>
<style lang="scss" src="./courses.scss"></style>
