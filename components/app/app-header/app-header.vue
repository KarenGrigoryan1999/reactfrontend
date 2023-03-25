<template lang="pug">
  header.app-header
    ._container.container
      nuxt-link._logo(to="/")
        img(src="@/assets/img/bt-logo.svg")._logo
      ._contacts(v-if="!isAuth")
        a._phone(:href="`tel:${formattedPhone}`") {{ phone }}
        app-button(size="s" type="bordered") Перезвоните мне
      nav._nav
        ._nav-list
          nuxt-link._nav-link.-courses(to="/cabinet" v-if="isAuth") Мои курсы
          nuxt-link._nav-link.-drop.-courses(to="/courses")
            span._nav-link-dropdown-text Все курсы
          nuxt-link._nav-link.-teachers(to="/teachers") Преподаватели
          nuxt-link._nav-link.-shop(to="/shop") Магазин
      ._ctrl
        ._ctrl-group(v-if="!isAuth")
          app-button(type="bordered" size="m" @click.native="setAuthModalStatus(true)")._btn Войти
          app-button(type="bordered" size="m" @click.native="setAuthModalStatus(true, 'registration')")._btn Регистрация
          app-button(size="l")._btn Бесплатный курс
        ._ctrl-group(v-else)
          ._user-menu(@click="showUserDropdown = !showUserDropdown" v-click-outside="closeUserDropdown")
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
  },
}
</script>

<style lang="scss" src="./app-header.scss"></style>
