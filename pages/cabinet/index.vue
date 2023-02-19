<template lang="pug">
  #cabinet-page
    cabinet-header
    my-courses
</template>

<script>
import CabinetHeader from "../../components/Cabinet/cabinet-header/cabinet-header";
import MyCourses from "../../components/Cabinet/my-courses/my-courses";
export default {
  name: "CabinetPage",
  components: {MyCourses, CabinetHeader},
  layout: "main",
  async asyncData({ store, $axios }) {
    await $axios.get("/xfields").then((r) => {
      r.data.forEach((x) => {
        store.dispatch("set", { name: x.code, value: x.value })
      })
    })
  },
  data() {
    return {}
  },
}
</script>
