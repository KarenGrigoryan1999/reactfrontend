<template lang="pug">
  #teacher-page
    Teacher(:teacher="teacher" :courseId="$route.query.course")
    teacher-illustration(:teacher="teacher")
    teacher-course-link(:teacher="teacher")
</template>

<script>
import Teacher from "../../components/Teachers/teacher/teacher"
import TeacherIllustration from "../../components/Teachers/teacher-illustration/teacher-illustration"
import TeacherCourseLink from "../../components/Teachers/teacher-course-link/teacher-course-link"
export default {
  name: "TeacherPage",
  components: { TeacherIllustration, TeacherCourseLink, Teacher },
  layout: "main",
  async asyncData({ store, $axios, route }) {
    await $axios.get("/xfields").then((r) => {
      r.data.forEach((x) => {
        store.dispatch("set", { name: x.code, value: x.value })
      })
    })

    return {
      teacher: await $axios.get(`/teachers/${route.params.id}`).then((r) => {
        return r.data
      }),
    }
  },
  data() {
    return {
      teacher: {},
    }
  },
}
</script>
