<template lang="pug">
  .free-modal
    ._dialog
      ._inner
        img._cross(src="../../../assets/img/cross.svg", alt="" @click="setFreeModalStatus(false)")
        app-tablet._tablet
          ._tablet-content
            ._text После активации, вы сможете пройти первый урок курса совершенно БЕСПЛАТНО, после этого вы сможете купить курс или отказаться от него!
            app-button(size="l" @click.native="activateFreeCourse")._btn Активировать бесплатный урок
</template>

<script>
import AppTablet from "../app-tablet/app-tablet";
import AppButton from "../app-button/app-button";

export default {
  name: "CartModal",
  components: {AppButton, AppTablet},
  data() {
    return {
      isLoading: true
    }
  },
  computed: {
    courseId: state => state.$store.getters.freeCourseId
  },
  async created() {
  },
  methods: {
    async activateFreeCourse() {
      await this.$axios.post("/users/get-free-course", {
        courseId: this.courseId
      }).then(async r => {
        if (r.data.id) {
          await this.$auth.fetchUser()
          this.setFreeModalStatus(false, 0);
          await this.$router.push("/cabinet");
        }
      })
    }
  }
}
</script>

<style lang="scss" src="./free-modal.scss"></style>
