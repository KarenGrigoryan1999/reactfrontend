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
        nuxt-link._teacher(v-for="(course, courseIndex) in courses" :key="course.id" :to="`/teachers/${course.teachers[0].id}`")
          img._teacher-photo(:src="filePath(course ? getPhotoIndex(course.teachers[0], courseIndex) : '')", alt="")
          ._teacher-course(:style="{color: course.color}") {{ course.name }}
          ._teacher-name {{ course.teachers[0].name }}
</template>

<script>
export default {
  name: "Teachers",
  props: {
    courses: {
      type: Array,
      default: () => [],
      required: true
    },
  },
  data() {
    return {
      teachers:[],
    }
  },
  mounted() {
    this.teachers = [];
  },
  methods: {
    getPhotoIndex(teacher) {
      if(this.teachers.includes(teacher.id)) {
        return teacher.photos[1];
      }else{
        this.teachers.push(teacher.id);
        return teacher.photos[0];
      }
    }
  }
}
</script>

<style lang="scss" src="./teachers.scss" scoped></style>
