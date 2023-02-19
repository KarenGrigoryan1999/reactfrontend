<template lang="pug">
  .my-courses
    ._container.container
      h2._title Мои курсы
      ._list(v-if="courses ? courses.length : 0")
        ._item(v-for="course in courses" :key="course.id")
          app-tablet._tablet(:color="course.color" @click.native="redirectToCourse(course.id)")
            ._tablet-content
              ._tablet-name {{ course.name }}
              ._tablet-free(v-if="!course.UserCourses.pay") Пробный урок
              ._tablet-free(v-else) до {{ getDate(course.UserCourses.end_date) }}
              img(:src="require(`~/assets/img/courses-theme-short/${course.theme}/1.svg`)")._decor-1
              img(:src="require(`~/assets/img/courses-theme-short/${course.theme}/2.svg`)")._decor-2
      ._no-courses(v-else) Вы ни купили ни одного курса
        app-button(size="l" @click.native="redirectToCourses")._no-courses-btn Выбрать курс
</template>

<script>
import AppButton from "../../app/app-button/app-button";

export default {
  name: "MyCourses",
  components: {AppButton},
  data() {
    return {
      courses: []
    }
  },
  created() {
    this.courses = this.currentUser.courses;
  },
  methods: {
    redirectToCourses() {
      this.$router.push("/courses");
    },
    redirectToCourse(id) {
      this.$router.push(`/cabinet/courses/${id}`);
    },
    getDate(d) {
      const date = new Date(d);
      let day = date.getUTCDate();
      let month = date.getMonth();
      const year = date.getFullYear();

      if (day < 10) {
        day = `0${day}`;
      }
      if (month < 10) {
        month = `0${month}`;
      }

      return `${day}.${month}.${year}`
    }
  }
}
</script>

<style lang="scss" src="./my-courses.scss"></style>
