<template lang="pug">
  .auth-modal__group.-recovery
    input.auth-modal__input.input-modal(type="text" v-model="email" placeholder="Введи почту" :class="{error: emailError}")
    .auth-modal__error {{ error }}
    button.auth-modal__btn.-small.btn(@click="recover") Отправить
</template>

<script>
export default {
  name: "RecoveryAuth",
  data() {
    return {
      email: "kolesov@kprod.agency",
      password: "ZLguJlw2",
      emailError: false,
      passwordError: false,
      error: "",
    }
  },
  methods: {
    async recover() {
      this.emailError = false

      if (!this.email) {
        this.emailError = true
        return
      }

      await this.$axios
        .post("/auth/reset-password", {
          email: this.email,
        })
        .then(() => {
          this.$emit("change-type", "recovery-send")
        })
        .catch((e) => {
          this.emailError = true
          this.error = e.response.data.message
        })
    },
  },
}
</script>
