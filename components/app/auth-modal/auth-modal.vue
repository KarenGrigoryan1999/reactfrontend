<template lang="pug">
  .auth-modal
    ._dialog
      ._content
        img.cross._cross(src="../../../assets/img/cross.svg", alt="" @click="setAuthModalStatus(false)")
        ._inner(ref="inner")
          ._back-btn(v-if="type !== 'start' && type !== 'registration'" @click="type = 'start'")
            svg(viewBox="0 0 27 24")._back-icon
              path(d="M25 13.5C25.8284 13.5 26.5 12.8284 26.5 12C26.5 11.1716 25.8284 10.5 25 10.5L25 13.5ZM0.939341 10.9393C0.353554 11.5251 0.353554 12.4749 0.93934 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.807609 11.0711 0.807608 10.4853 1.3934L0.939341 10.9393ZM25 10.5L2 10.5L2 13.5L25 13.5L25 10.5Z")
          h3._title(:class="{regTitle: type === 'registration'}" v-html="title")
          ._text(v-if="text") {{ text }}
          component(:is="type" @change-type="changeType" v-if="true")
</template>

<script>
import start from "./forms/start"
import email from "./forms/email"
import registration from "./forms/registration"
import recovery from "./forms/recovery"

export default {
  name: "AuthModal",
  components: { start, email, recovery, registration },
  data() {
    return {
      type: "", // start email register success
    }
  },
  computed: {
    title: function () {
      if (this.type === "email") {
        return "Вход через почту"
      }
      if (this.type === "registration") {
        return "Регистрация"
      }
      if (this.type === "reg-success") {
        return "Ура, ты зарегистрирован!"
      }
      if (this.type === "recovery") {
        return "Восстановление пароля"
      }
      if (this.type === "recovery-success") {
        return "Новый пароль отправлен<br/> на почту"
      }
      if (this.type === "recovery-send") {
        return "Инструкция по восстановлению<br/>пароля отправлена на почту"
      }
      if (this.type === "recovery-error") {
        return "Ссылка на восстановление пароля<br/>не действительна"
      }

      return "Вход"
    },
    text: function () {
      if (this.type === "recovery") {
        return "На твою почту будет отправлена ссылка для восстановления пароля"
      }
      return ""
    },
    initialType: (state) => state.$store.getters["authModalType"],
    isNoComponent: (state) =>
      state.type === "recovery-success" ||
      state.type === "recovery-error" ||
      state.type === "recovery-send",
  },
  methods: {
    changeType(type) {
      this.type = type
    },
  },
  async created() {
    this.type = this.initialType || "email"
  },
  destroyed() {
    this.setAuthModalStatus(false, "email")
  },
}
</script>

<style lang="scss" src="./auth-modal.scss"></style>
