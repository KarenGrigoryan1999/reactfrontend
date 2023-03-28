<template lang="pug">
  .auth-modal__group
    input.auth-modal__input.input-modal(type="text" v-model="name" placeholder="Введи имя" :class="{error: nameError}")
    input.auth-modal__input.input-modal(type="text" v-model="lastName" placeholder="Введи фамилию" :class="{error: lastNameError}")
    input.auth-modal__input.input-modal(type="text" v-model="email" placeholder="Введи почту" :class="{error: emailError}")
    input.auth-modal__input.input-modal(type="password" v-model="password" placeholder="Введи пароль" :class="{error: passwordError}")
    input.auth-modal__input.input-modal(type="password" v-model="repeatedPassword" placeholder="повтори пароль" :class="{error: repeatedPasswordError}")
    .auth-modal__recovery-box
    .auth-modal__error {{ error }}
    button.auth-modal__btn.-small.btn(@click="registration") Регистрация
</template>

<script>
export default {
  name: "Registration",
  data() {
    return {
      name: "",
      lastName: "",
      email: "",
      password: "",
      repeatedPassword: "",
      emailError: false,
      passwordError: false,
      nameError: false,
      lastNameError: false,
      repeatedPasswordError: false,
      error: "",
    }
  },
  methods: {
    registration() {
      this.nameError = false
      this.lastNameError = false
      this.emailError = false
      this.passwordError = false
      this.repeatedPasswordError = false

      if (!this.email) {
        this.emailError = true
      }
      if (!this.password) {
        this.passwordError = true
      }
      if (!this.name) {
        this.nameError = true
      }
      if (!this.lastName) {
        this.lastNameError = true
      }
      if (!this.repeatedPassword || this.repeatedPassword !== this.password) {
        this.repeatedPasswordError = true
      }

      if (!this.email || !this.password || !this.repeatedPassword || !this.name || !this.lastName) {
        return
      }

      this.$axios
        .post("/auth/registration", {
            name: this.name,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
          })
        .then(() => {
          this.$auth
            .loginWith("local", {
              data: {
                email: this.email,
                password: this.password,
              },
            }).then(() => this.setSuccessModalStatus(true));
        })
        .catch((e) => {
          if (e.response.data?.errors?.length) {
            this.error = e.response.data.errors[0].error
            return
          }
          this.error = e.response.data.message
        })
    },
  },
}
</script>
