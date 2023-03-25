<template lang="pug">
  #course
    pre
    CourseHeader(:course="course")
    Questions(:course="course")
    StartFree(:course="course")
</template>

<script>
import CourseHeader from "../../components/Courses/course-header/course-header"
import Questions from "../../components/Courses/questions/questions"
import StartFree from "../../components/Courses/start-free/start-free"
export default {
  name: "CoursePreview",
  layout: "main",
  components: { StartFree, Questions, CourseHeader },
  async asyncData({ store, route, $axios }) {
    await $axios.get("/xfields").then((r) => {
      r.data.forEach((x) => {
        store.dispatch("set", { name: x.code, value: x.value })
      })
    })

    return {
      course: await $axios.get(`/courses/${route.params.id}`).then((r) => {
        return r.data
      }),
    }
  },
  data() {
    return {
      course: {},
    }
  },
}
</script>
