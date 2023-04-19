<template lang="pug">
  #main-page
    hero
    Sale(:mainPageInfo="mainPageInfo")
    collect-set(:courses="propousedCourses" v-if="propousedCourses.length")
    index-teachers(:courses="courses" v-if="courses.length")
    teacher-selection(:mainPageInfo="mainPageInfo")
    stages
    start
</template>

<script>
import Hero from "../components/MainPage/hero/hero"
import Sale from "../components/Sale/Sale"
import IndexTeachers from "../components/MainPage/teachers/teachers"
import Stages from "../components/MainPage/stages/stages"
import Start from "../components/MainPage/start/start"
import CollectSet from "../components/MainPage/collect-set/collect-set"
import TeacherSelection from "../components/MainPage/teacher-selection/teacher-selection"

export default {
  name: "IndexPage",
  layout: "main",
  components: {
    TeacherSelection,
    CollectSet,
    Start,
    Stages,
    IndexTeachers,
    Sale,
    Hero,
  },
  async asyncData({store, $axios}) {
     await $axios.get("/main-page-fields").then((r) => {
        store.dispatch("set", {name: "mainPageInfo", value: r.data[0]});
      })
    await $axios.get("/xfields").then((r) => {
      r.data.forEach((x) => {
        store.dispatch("set", {name: x.code, value: x.value})
      })
    })
    await $axios.get("/learn-stages").then((r) => {
      store.dispatch("set", {name: 'stages', value: r.data})
    })
    
    return {
      courses: await $axios.get("/courses").then((r) => {
        const response = r.data.map((t, i) => ({...t, active: i === 0}));
        store.dispatch("set", {
            name: 'courses',
            value: response
        });
        return response
      }),
    }
  },
  data() {
    return {
      courses: [],
    }
  },
  created() {
    this.userCourses = this.currentUser ? this.currentUser.courses : [];
  },
  computed: {
    mainPageInfo: (state) => state.$store.getters.mainPageInfo,
    stages: (state) => state.$store.getters.stages,
    propousedCourses: (state) => state.courses.filter((element) => {
      return state.userCourses.reduce((acc, userCourseElement) => { return userCourseElement.id !== element.id ? acc : false}, true)
    })
  },
  beforeMount() {
    if(this.$route.query.code){
      const { code, state } = this.$route.query; 
      this.$router.replace("/");
      this.$auth
        .loginWith("local", {
          data: {
            email: "email@email.ru",
            password: code,
            type: state,
          },
        })
        .then(() => {
          this.setAuthModalStatus(false)
        })
    }
    if (this.$route.query["show-login"] === "true") {
      this.setAuthModalStatus(true)
    }

    const email = this.$route.query["email"]
    const resetCode = this.$route.query["reset-code"]
    if (email && resetCode) {
      this.$axios
        .get(`/auth/reset-password/${email}/${resetCode}`)
        .then(() => {
          this.setAuthModalStatus(true, "recovery-success")
        })
        .catch(() => {
          this.setAuthModalStatus(true, "recovery-error")
        })
        .finally(() => {
          this.$router.replace("/")
        })
    }
  },
}
</script>
