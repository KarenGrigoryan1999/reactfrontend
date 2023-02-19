<template lang="pug">
  #courses-page
    Courses(:courses="courses")
</template>

<script>
import Courses from "../../components/Courses/courses/courses"
export default {
  name: "CoursesPage",
  layout: "main",
  components: { Courses },
  async asyncData({ store, $axios }) {
    await $axios.get("/xfields").then((r) => {
      r.data.forEach((x) => {
        store.dispatch("set", { name: x.code, value: x.value })
      })
    })

    return {
      courses: await $axios.get("/courses").then((r) => {
        return r.data
      }),
    }
  },
  data() {
    return {
      courses: [],
    }
  },
}
</script>
