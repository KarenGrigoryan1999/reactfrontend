<template lang="pug">
  section.teachers
    ._container.container
      ._head
        h2._caption.caption
          .caption_rotate
            span O
            span u
            span r
          ._caption-text.caption__text
            span T
            span e
            span a
            span c
            span h
            span e
            span r
            span s
        ._subtitle.subtitle Наши преподаватели
      ._list
        nuxt-link._teacher(v-for="teacher in teachers" :key="teacher.id" :to="`/teachers/${teacher.id}`" v-if="teacher.courses.length")
          img._teacher-photo(:src="filePath(teacher ? teacher.photos[0] : '')", alt="")
          ._teacher-course(:style="{color: teacher.courses[0].color}") {{ teacher.courses[0].name }}
          ._teacher-name {{ teacher.name }}
</template>

<script>
export default {
  name: "Teachers",
  props: {
    teachers: {
      type: Array,
      default: () => [],
      required: true
    }
  }
}
</script>

<style lang="scss" src="./teachers.scss" scoped></style>
