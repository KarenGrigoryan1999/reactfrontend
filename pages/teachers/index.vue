<template lang="pug">
  #teachers-page
    Teachers(:teachers="teachers")
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
      teachers: await $axios.get("/teachers").then((r) => {
        return r.data
      }),
    }
  },
  data() {
    return {
      teachers: [],
    }
  },
}
</script>
