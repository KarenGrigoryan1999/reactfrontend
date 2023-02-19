<template lang="pug">
  #teacher-page
    Teacher(:teacher="teacher")
    teacher-illustration(:teacher="teacher")
</template>

<script>
import Teacher from "../../components/Teachers/teacher/teacher"
import TeacherIllustration from "../../components/Teachers/teacher-illustration/teacher-illustration"
export default {
  name: "TeacherPage",
  components: { TeacherIllustration, Teacher },
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
