<template lang="pug">
  section.cabinet-course(:class="course.theme")
    ._container.container
      course-progress(:theme="theme" :lessonsCompleted="lessonsCompletedPercent" :tests="course.results")
      ._elem.about-elem(v-if="isFile")
        a(:href="filePath(course.file[0])" target="_blank" download)._download-link Скачать методичку
      ._right
        ._heading.about-elem(:style="courseNameStyles") {{ course.name }}
        ._info {{lessonsCompleted}}/{{ lessonsCount }} уроков
        perfect-scrollbar._list(tag="ul" :options="{wheelPropagation: false}")
          nuxt-link._item(v-for="(lesson, idx) in course.lessons" :key="lesson.id + lesson.name" :class="{passed: idx + 1 <= lessonsCompleted, current: idx === lessonsCompleted, free: lesson.free}" tag="li" :to="`/cabinet/lesson/${lesson.id}`")
            span._link {{ lesson.name }}
          nuxt-link._item.test(v-for="(test, idx) in course.tests" :key="test.id + test.name" tag="li" :to="`/cabinet/tests/${test.id}`")
            span._link {{ test.name }}
        nuxt-link._button(:to="`/cabinet/lesson/${lastLesson}`" v-if="lessonsCompleted !== lessonsCount") Продолжить просмотр
          svg(width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg")._button-icon
            path(:style="playBtnStyles" d="M16.681 10.6576C17.2965 11.0508 17.2965 11.9498 16.681 12.343L1.53838 22.0172C0.872735 22.4424 9.47256e-07 21.9644 9.81783e-07 21.1745L1.82755e-06 1.82558C1.86208e-06 1.03568 0.872757 0.557608 1.5384 0.982892L16.681 10.6576Z")
      img._decor-4(v-if="theme" :src="require(`~/assets/img/courses-theme/5/${theme}.png`)")
    img._decor-1(v-if="theme" :src="require(`~/assets/img/courses-theme/2/${theme}.png`)")
    img._decor-2(v-if="theme" :src="require(`~/assets/img/courses-theme/3/${theme}.png`)")
    img._decor-3(v-if="theme" :src="require(`~/assets/img/courses-theme/4/${theme}.png`)")

</template>

<script>
import AppButton from "../../app/app-button/app-button";
import CourseProgress from "../course-progress/course-progress";

export default {
  name: "CabinetCourse",
  components: {CourseProgress, AppButton},
  data() {
    return {
      course: {
        theme: "",
        lessons: [],
        tests: [],
        file: [{id: 0}],
        lastLesson: 0,
        finishedLessons: [],
      }
    }
  },
  computed: {
    courseId: state => state.$route.params.id,
    lessonsCount: state => state.course.lessons.length || 0,
    lessonsCompleted: state => state.course.finishedLessons.length,
    lessonsCompletedPercent: state => Math.round((state.course.finishedLessons.length / state.course.lessons.length) * 100) || 0,
    isFile: state => state.course.file[0]?.id,
    theme: state => state.course?.theme,
    courseNameStyles: state => ({
      color: state.course.color
    }),
    playBtnStyles: state => ({
      fill: state.course.color
    }),
  },
  async created() {
    const checkCourse = await this.currentUser.courses.find(c => c.id === +this.courseId);
    await this.increaseStatistic();
    
    if (checkCourse?.id) {
      return await this.getCourse();
    }
    await this.$router.push("/404");
  },
  methods: {
    async increaseStatistic() {
      await this.$axios.put('/statistic', {
        courseId: this.courseId
      });
    },
    async getCourse() {
      await this.$axios.get(`/courses/my/${this.courseId}`).then(r => {
        this.course = r.data;
        this.lastLesson = this.course.lessons.reduce((value, lessonElement, idx) => idx === this.lessonsCompleted ? lessonElement.id: value, 0);
        const el = document.querySelector(".ps__rail-y");

        el.style.backgroundColor = `${this.course.color}!important`;
      })
    }
  }
}
</script>

<style lang="scss" src="./course.scss"></style>
