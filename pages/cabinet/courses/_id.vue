<template lang="pug">
  #cabinet-course
    cabinet-header(:course-page="true")
    cabinet-course
</template>

<script>
import CabinetCourse from "../../../components/Cabinet/course/course";
import CabinetHeader from "../../../components/Cabinet/cabinet-header/cabinet-header";
export default {
  name: "CabinetCoursePage",
  components: {CabinetHeader, CabinetCourse},
  layout: "main"
}
</script>
