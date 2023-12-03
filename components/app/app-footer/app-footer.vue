<template lang="pug">
  footer.app-footer
    ._container.container
      ._wrapper
        nuxt-link._logo(to="/")
          img(src="@/assets/img/logo.png", alt="Bad teachers")._logo
        ._elem
          ._call
            a._tel(:href="`tel:${formattedPhone}`") {{ phone }}
            button._btn-tel(type="button" @click="callMe") Перезвоните мне
          a._link(href="/docs/policy.pdf" target="_blank") правовая информация
          a._link(href="/docs/agreement.pdf" target="_blank") договоры оферты
        ._item
          ._questions
            a._mail(:href="`mailto:${email}`") {{ email }}
            a._link-question задать вопросы
          ._questions
            a._mail(:href="`mailto:${email}`") {{ email }}
            a._link-question задать вопросы
        ._social
          a.social__link(:href="telegram" target="_blank")
            img(src="./img/tg.svg" alt="Telegram")
          a.social__link(:href="whatsApp" target="_blank")
            img(src="./img/whatsapp.png" alt="WhatsApp")
      p._company-name ООО «Биванкеноби»
</template>

<script>
export default {
  name: "AppFooter",
  computed: {
    phone: state => state.$store.getters.phone,
    formattedPhone: state => state.$store.getters.formattedPhone,
    email: state => state.$store.getters.email,
    telegram: state => state.$store.getters.telegram,
    whatsApp: state => state.$store.getters.whatsApp,
  },
  methods: {
    callMe() {
      this.setCallModalStatus(true);
    }
  }
}
</script>
<style lang="scss" src="./footer.scss"></style>
