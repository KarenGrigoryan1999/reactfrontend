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
                  ._item-price {{ item.sale_price }}
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
              app-button(size="xl" @click.native="pay") Оплатить
          ._tablet-content(v-else)
            ._title Ваша корзина пуста
            ._button-wrap
              app-button(size="l" @click.native="redirectToCourses") Выбрать курс
</template>

<script>
import AppTablet from "../app-tablet/app-tablet";
import AppButton from "../app-button/app-button";

export default {
  name: "CartModal",
  components: {AppButton, AppTablet},
  data() {
    return {
      isLoading: true,
      list: []
    }
  },
  computed: {
    sale: state => state.$store.getters.sale / 100,
    oldPrice: state => state.list.reduce((acc, current) => acc + current.price, 0),
    salePrice: state => state.oldPrice - (state.oldPrice * state.sale),
    isNeedSale: state => state.list.length >= 4
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
    pay() {
      if(this.isAuth) {
        window.location.href = "https://tinkoff.ru";
      } else {
        this.setCartModalStatus(false);
        this.setAuthModalStatus(true);
      }
    },
    deleteCourse(id) {
      console.log(this.cart, '1');
      const list = this.list.filter((element) => element.id !== id);
      this.list = [...list];

      const cart = this.$store.getters.cart.filter((element) => element.courseId !== id);
      this.$store.dispatch('set', {name: 'cart', value: cart});

      this.$axios.delete(`/cart/${id}`);
    }
  }
}
</script>

<style lang="scss" src="./cart-modal.scss"></style>
