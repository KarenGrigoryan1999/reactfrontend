<template lang="pug">
  #main-layout
    app-loader(v-if="!isReady")
    div(:class="{pending: !isReady}")
      app-header
      Nuxt
      transition(name="modal")
        auth-modal(v-if="showAuthModal && !isAuth")
      transition(name="modal")
        cart-modal(v-if="showCartModal")
      transition(name="modal")
        free-modal(v-if="showFreeModal")
      transition(name="modal")
        gift-modal(v-if="showGiftModal")
      transition(name="modal")
        success-modal(v-if="showSuccessModal")
      transition(name="modal")
        success-registration-modal(v-if="showSuccessRegistrationModal")
      transition(name="modal")
        free-course-modal(v-if="showFreeCourseModal" :courseId="selectedCourse")
      transition(name="modal")
        call-modal(v-if="showCallModal")
      app-footer
      up-button
</template>
<script>
import AppHeader from "../components/app/app-header/app-header"
import AppLoader from "../components/app/app-loader/app-loader"
import AppFooter from "../components/app/app-footer/app-footer"
import AuthModal from "../components/app/auth-modal/auth-modal"
import CartModal from "../components/app/cart-modal/cart-modal";
import FreeModal from "../components/app/free-modal/free-modal";
import GiftModal from "../components/app/gift-modal/gift-modal";
import CallModal from "../components/app/call-modal/call-modal";
import SuccessModal from "../components/app/success-modal/success-modal"
import SuccessRegistrationModal from "../components/app/success-registration-modal/success-registration-modal"
import FreeCourseModal from "../components/app/free-course-modal/free-course-modal"
import UpButton from "../components/app/up-button/up-button"

export default {
  components: {CartModal, CallModal, AppFooter, AppHeader, AppLoader, AuthModal, FreeModal, SuccessModal, SuccessRegistrationModal, GiftModal, FreeCourseModal, UpButton },
  computed: {
    showAuthModal: state => state.$store.getters.authModalStatus,
    showCartModal: state => state.$store.getters.cartModalStatus,
    showCallModal: state => state.$store.getters.callModalStatus,
    showFreeModal: state => state.$store.getters.freeModalStatus,
    showGiftModal: state => state.$store.getters.showGiftModal,
    showSuccessModal: state => state.$store.getters.showSuccessModal,
    showSuccessRegistrationModal: state => state.$store.getters.showSuccessRegistrationModal,
    showFreeCourseModal: state => state.$store.getters.freeCourseModalStatus,
    selectedCourse: state => state.$store.getters.selectedCourse,
    pageUrl: state => state.$router.currentRoute.path,
    isReady: (state) => state.$store.getters.isReady
  },
  methods: {
    async increaseStatistic() {
      await this.$axios.put('/statistic');
    },
    setLoaded() {
      setTimeout(() => {  
        this.$store.dispatch("set", {
          name: "isReady",
          value: true,
        });
      }, 2000);
    }
  },
  async created() {
    await this.increaseStatistic();
    this.getCart();
  },
  mounted() {
    window.addEventListener('load', () => {
      this.setLoaded();
    })
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

<style scoped>
  .pending {
    opacity: 0;
  }
</style>
