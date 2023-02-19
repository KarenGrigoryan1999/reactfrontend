<template lang="pug">
  #main-layout
    app-header
    Nuxt
    transition(name="modal")
      auth-modal(v-if="showAuthModal && !isAuth")
    transition(name="modal")
      cart-modal(v-if="showCartModal")
    transition(name="modal")
      free-modal(v-if="showFreeModal")
    transition(name="modal")
      success-modal(v-if="showSuccessModal")
    app-footer
</template>
<script>
import AppHeader from "../components/app/app-header/app-header"
import AppFooter from "../components/app/app-footer/app-footer"
import AuthModal from "../components/app/auth-modal/auth-modal"
import SuccessModal from "../components/app/success-modal/success-modal"
import CartModal from "../components/app/cart-modal/cart-modal";
import FreeModal from "../components/app/free-modal/free-modal";

export default {
  components: {CartModal, AppFooter, AppHeader, AuthModal, FreeModal, SuccessModal },
  computed: {
    showAuthModal: state => state.$store.getters.authModalStatus,
    showCartModal: state => state.$store.getters.cartModalStatus,
    showFreeModal: state => state.$store.getters.freeModalStatus,
    showSuccessModal: state => state.$store.getters.showSuccessModal
  },
  created() {
    this.getCart();
  },
  watch: {
    isAuth(status) {
      if (status) {
        const storageCart = localStorage.getItem("cart") ? localStorage.getItem("cart") : "[]";
        const cart = JSON.parse(storageCart);

        if (cart.length) {
          cart.forEach(item => {
            this.addToCart(item.courseId);
          });

          localStorage.setItem("cart", "[]");
        } else {
          this.getCart();
        }
      } else {
        this.$store.dispatch("set", {
          name: "cart",
          value: []
        })
      }
    }
  }
}
</script>
