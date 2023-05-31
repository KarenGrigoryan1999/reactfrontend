<template lang="pug">
  .call-modal
    ._dialog
      ._inner
        img._cross(src="../../../assets/img/cross.svg", alt="" @click="close")
        app-tablet._tablet
          ._tablet-content
            template(v-if="success")
              h1 Мы перезвоним тебе в ближайшее время!
              app-button(size="l" @click.native="close" :spot='false')._btn Ок
            template(v-if="!success")
              template(v-if="!isLoading")
                h1 Заполни данные и мы обязательно тебе перезвоним
                input._address-input.input-modal(placeholder="Как к тебе обращаться?" v-model="userData")
                input._address-input.input-modal(placeholder="Номер телефона" v-model="phone" type="number")
                p._error(v-if="error") Проверьте правильность заполненных данных!
              h1(v-if="isLoading") Загрузка...
              app-button(v-if="!isLoading" size="l" @click.native="send" :spot='false' :disabled='sendButtonDisabled')._btn Отправить
</template>

<script>
import AppTablet from "../app-tablet/app-tablet";
import AppButton from "../app-button/app-button";

export default {
  name: "CallModal",
  components: {AppButton, AppTablet},
  data() {
    return {
      isLoading: false,
      success: false,
      error: false,
      userData: '',
      phone: '',
    }
  },
  computed: {
    sendButtonDisabled: state => !(state.userData.length > 0 && state.phone.length > 0)
  },
  async created() {
  },
  methods: {
    close() {
      this.setCallModalStatus(false);
    },
    send() {
      this.isLoading = true;

      this.$axios.post("/calls", {
        userData: this.userData,
        phone: this.phone,
      }).then(() => {
        this.success = true;
        this.isLoading = false;
      }).catch((e) => {
        this.error = true;
        this.isLoading = false;
      });
    }
  }
}
</script>

<style lang="scss" src="./call-modal.scss"></style>
