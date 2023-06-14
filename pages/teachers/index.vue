<template lang="pug">
  #teachers-page
    Teachers(:courses="courses")
</template>

<script>
import Teachers from "../../components/Teachers/teachers/teachers"
export default {
  name: "TeachersPage",
  components: { Teachers },
  layout: "main",
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
