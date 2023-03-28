<template lang="pug">
  .auth-modal__group
    input.auth-modal__input.input-modal(type="text" v-model="email" placeholder="Введи почту" :class="{error: emailError}")
    input.auth-modal__input.input-modal(type="password" v-model="password" placeholder="Введи пароль" :class="{error: passwordError}")
    .auth-modal__recovery-box
      span.auth-modal__recovery-link(@click="$emit('change-type', 'recovery')") Забыл пароль?
    .auth-modal__error {{ error }}
    button.auth-modal__btn.-small.btn(@click="login") Войти
    app-button(type="bordered" size="m" @click.native="registration")._btn Регистрация
</template>

<script>
export default {
  name: "EmailAuth",
  data() {
    return {
      email: "kolesov@kprod.agency",
      password: "Z9SdbneS",
      emailError: false,
      passwordError: false,
      error: "",
    }
  },
  methods: {
    login() {
      this.emailError = false
      this.passwordError = false

      if (!this.email) {
        this.emailError = true
      }
      if (!this.password) {
        this.passwordError = true
      }

      if (!this.email || !this.password) {
        return
      }

      this.$auth
        .loginWith("local", {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        .then(() => {
          this.setAuthModalStatus(false)
        })
        .catch((e) => {
          if (e.response.data?.errors?.length) {
            this.error = e.response.data.errors[0].error
            return
          }
          this.error = e.response.data.message
        })
    },
    registration() {
      this.setAuthModalStatus(false);
      
      setTimeout(() => {
        this.setAuthModalStatus(true, 'registration');
      }, 100);
    }
  },
}
</script>
