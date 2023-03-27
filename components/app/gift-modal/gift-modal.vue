<template lang="pug">
  .free-modal
    ._dialog
      ._inner
        img._cross(src="../../../assets/img/cross.svg", alt="" @click="close")
        app-tablet._tablet
          ._tablet-content
            template(v-if="success")
              h1 Твой подарок будет доставлен тебе в ближайшее время!
              app-button(size="l" @click.native="close" :spot='false')._btn ОСпасибо!
            template(v-if="showAddressForm && !success")
              template(v-if="!isLoading")
                h1 Заполни данные и мы отправим тебе твою покупку
                input._address-input.input-modal(placeholder="Адрес" v-model="address")
                input._address-input.input-modal(placeholder="Почта" v-model="mail")
                input._address-input.input-modal(placeholder="Номер телефона" v-model="phone" type="number")
                p._error(v-if="error") Проверьте правильность заполненных данных!
              h1(v-if="isLoading") Загрузка...
              app-button(v-if="!isLoading" size="l" @click.native="send" :spot='false' :disabled='sendAdressButtonDisabled')._btn Отправить
            template(v-if="!showAddressForm")
              ._text {{gift ? `Ты действительно хочешь обменять баллы на ${gift.name}?` : 'У тебя пока что не хватает баллов!'}}
              app-button(v-if="gift === null" size="l" @click.native="close" :spot='false')._btn Ок
              div._flex-wrapper
                app-button(v-if="gift !== null" size="l" @click.native="getGift" :spot='false')._btn Да!
                app-button(v-if="gift !== null" size="l" @click.native="close" :spot='false')._btn Нет
</template>

<script>
import AppTablet from "../app-tablet/app-tablet";
import AppButton from "../app-button/app-button";

export default {
  name: "CartModal",
  components: {AppButton, AppTablet},
  data() {
    return {
      isLoading: false,
      showAddressForm: false,
      success: false,
      error: false,
      address: '',
      mail: '',
      phone: '',
    }
  },
  computed: {
    gift: state => state.$store.getters.gift,
    balance: state => state.$store.getters.balance,
    sendAdressButtonDisabled: state => !(state.address.length > 0 && state.mail.length > 0 && state.phone.length > 0)
  },
  async created() {
  },
  methods: {
    close() {
      this.setGiftModalStatus(false);
    },
    getGift() {
      this.showAddressForm = true;
    },
    send() {
      this.isLoading = true;

      this.$axios.post("/gifts", {
        address: this.address,
        mail: this.mail,
        phone: this.phone,
        shopId: this.gift.id
      }).then(() => {
        setTimeout(() => {
          this.$store.dispatch("set", {
            name: 'balance',
            value: this.balance - this.gift.price
          });
          this.success = true;
          this.isLoading = false;
      }, 1000);
      }).catch((e) => {
        this.error = true;
      });
    }
  }
}
</script>

<style lang="scss" src="./gift-modal.scss"></style>
