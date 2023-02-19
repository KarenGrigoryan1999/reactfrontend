<template lang="pug">
  #lesson-page
</template>

<script>
export default {
  name: "LessonPage",
  layout: "main",
  data() {
    return {
      lesson: {}
    }
  },
  computed: {
    lessonId: state => state.$route.params.id
  },
  created() {
    this.getLesson();
  },
  methods: {
    async getLesson() {
      await this.$axios.get(`/lessons/${this.lessonId}`).then(r => {
        this.lesson = r.data;
      }).catch(() => {
        this.$router.push("/access-denied");
      })
    }
  }
}
</script>
