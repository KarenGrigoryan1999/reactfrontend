<template lang="pug">
  .course-tablet
    app-tablet
    ._name {{ name }}
</template>

<script>
import AppTabletDecor from "../app-tablet/app-tablet"
export default {
  name: "CourseTablet",
  components: { AppTabletDecor },
  props: {
    theme: {
      type: String,
      default: "",
      required: true,
    },
    name: {
      type: String,
      default: "",
      required: true,
    },
  },
}
</script>

<style lang="scss">
.course-tablet {
  width: 100%;
  height: 430px;
}
</style>
