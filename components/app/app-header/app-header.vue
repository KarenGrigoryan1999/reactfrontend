<template lang="pug">
  header.app-header
    ._container.container
      nuxt-link._logo(to="/")
        img(src="@/assets/img/logo.png")._logo
      ._contacts
        a._phone(:href="`tel:${formattedPhone}`") {{ phone }}
        app-button(size="s" type="bordered" @click.native="callMe") Перезвоните мне
      nav._nav
        ._nav-list
          nuxt-link._nav-link.-courses(to="/cabinet" v-if="isAuth") Мои курсы
          nuxt-link._nav-link.-drop.-courses(to="/courses")
            span(:class="{'app_header__nav_link_dropdown_text': true}") Все курсы
          nuxt-link._nav-link.-teachers(to="/teachers") Преподаватели
          nuxt-link._nav-link.-shop(to="/shop") Магазин
      ._ctrl
        ._ctrl-group(:class="{flex_block: isAuth}")
          app-button(v-if="!isAuth" type="bordered" size="m" @click.native="setAuthModalStatus(true, 'start')")._btn Войти
          app-button(v-if="!isAuth" size="l" :spot="false" @click.native="setFreeCourseModalStatus(true)")._btn Бесплатный урок
          ._user-menu(v-if="isAuth" @click="showUserDropdown = !showUserDropdown" v-click-outside="closeUserDropdown")
            ._user-avatar-box(:class="{'no-avatar': noAvatar}")
              img(:src="avatar")._user-avatar
            transition(name="show-menu")
              ._user-menu-dropdown(v-if="showUserDropdown")
                ._user-menu-dropdown-inner
                  nuxt-link._user-menu-item(to="/cabinet") Мой профиль
                  ._user-menu-item(@click="$auth.logout()") Выход
        ._cart-box
          ._cart(@click="setCartModalStatus(true)")
            ._cart-count {{ cart.length }}
</template>

<script>
import AppButton from "../app-button/app-button";
export default {
  name: "AppHeader",
  components: {AppButton},
  data() {
    return {
      showUserDropdown: false,
    }
  },
  computed: {
    cart: state => state.$store.getters.cart,
    phone: (state) => state.$store.getters.phone,
    formattedPhone: (state) => state.$store.getters.formattedPhone,
    noAvatar: (state) => !state.$auth.user?.avatar.length,
    avatar: function () {
      if (this.isAuth) {
        if (this.$auth.user.avatar.length) {
          return this.filePath(this.$auth.user.avatar[0])
        }
        return require("./img/no-avatar.svg")
      }

      return false
    },
  },
  methods: {
    closeUserDropdown() {
      this.showUserDropdown = false
    },
    callMe() {
      this.setCallModalStatus(true);
    }
  },
}
</script>

<style lang="scss" src="./app-header.scss"></style>
