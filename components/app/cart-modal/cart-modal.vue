<template lang="pug">
  .cart-modal
    ._dialog
      ._inner
        img._cross(src="../../../assets/img/cross.svg", alt="" @click="setCartModalStatus(false)")
        app-tablet._tablet
          ._tablet-content(v-if="isLoading")
            ._title Загрузка корзины...
          ._tablet-content(v-else-if="list.length")
            ._title Корзина
            ._list
              ._item(v-for="item in list" :key="item.id")
                ._item-name {{ item.name }}
                div._flex-wrapper
                  ._item-price {{ item.price }}
                  button._delete(@click="deleteCourse(item.id)")
                    img(src="../../../assets/img/cart/delete.png", alt="")
            ._footer
              ._item(:class="{'cart-modal__item_with-discount': !isNeedSale}")
                ._item-title Итого:
                ._item-price(:class="{'cart-modal__item-price_old': isNeedSale}") {{ oldPrice }}
              ._item.-with-discount(v-if="isNeedSale")
                ._item-title ИТОГО с&nbsp;учётом&nbsp;скидки:
                ._item-price {{ salePrice }}
            ._button-wrap
              input.input-modal(placeholder="Введи промокод" v-model="promo" @input="promoLoading = true")
              p._loading(v-if="promoLoading") Проверка...
              p._discount(v-if="promoDiscount") Скидка {{ promoDiscountPrice }} от начальной стоймости при использовании купона
              app-button(size="xl" @click.native="pay") Оплатить
          ._tablet-content(v-else)
            ._title Ваша корзина пуста
            ._button-wrap
              app-button(size="l" @click.native="redirectToCourses") Выбрать курс
</template>

<script>
import AppTablet from "../app-tablet/app-tablet";
import AppButton from "../app-button/app-button";
import {debounce} from '../../../helpers/debounce'

export default {
  name: "CartModal",
  components: {AppButton, AppTablet},
  data() {
    return {
      promo: '',
      promoDiscount: null,
      isLoading: true,
      promoLoading: false,
      list: []
    }
  },
  computed: {
    sale: state => state.$store.getters.sale / 100,
    oldPrice: state => state.list.reduce((acc, current) => acc + current.price, 0),
    salePrice: state => Math.max(state.oldPrice - (state.oldPrice * state.sale) - (state.promoDiscount ? (state.promoDiscount.type === 0 ? state.oldPrice * (state.promoDiscount.discount / 100) : state.promoDiscount.discount) : 0), 0),
    isNeedSale: state => state.list.length >= 3 || state.promoDiscount,
    promoDiscountPrice: state => state.promoDiscount ? `${state.promoDiscount.discount}${state.promoDiscount.type === 0 ? '%' : ' рублей'}` : '',
  },
  async created() {
    if (this.cart.length) {
      await this.getCourses();
      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
      return;
    }
    this.isLoading = false;
  },
  watch: {
    promo: debounce(async function (newVal) {
      this.promoLoading = false;
      try {
        const res = await this.$axios.post(`/promo/check/${newVal}`);
        this.promoDiscount = res.data;
      } catch(e) {
        this.promoDiscount = null;
      }
    }, 1000)
  },
  methods: {
    redirectToCourses() {
      this.$router.push("/courses");
      this.setCartModalStatus(false);
    },
    async getCourses() {
      this.cart.forEach(item => {
        this.$axios.get(`/courses/${item.courseId}`).then(r => {
          this.list.push(r.data);
        })
      })
    },
    async pay() {
      if(this.isAuth) {
        const redirectUrl = await this.$axios.post('/payments', {
          courses: this.list.map(element => element.id),
          promo: this.promoDiscount
        });
        window.location.replace(redirectUrl.data.url);
      } else {
        this.setCartModalStatus(false);
        this.setAuthModalStatus(true);
      }
    },
    deleteCourse(id) {
      this.deleteFromCart(id);
    },
  }
}
</script>

<style lang="scss" src="./cart-modal.scss"></style>
