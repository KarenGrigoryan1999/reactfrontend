import Vue from "vue"

Vue.mixin({
  async asyncData({$axios}) {
    return {
      xfields: await $axios.get("/xfields").then((r) => {
        return r.data
      }),
    }
  },
  computed: {
    currentUser: state => state.$auth.user,
    isAuth: (state) => state.$auth.loggedIn,
    cart: (state) => state.$store.getters.cart,
  },
  methods: {
    filePath(file) {
      if (!file?.catalog && !file?.name) {
        return ""
      }
      return `${process.env.VUE_APP_STORAGE_URL}/${file.catalog}/${file.name}`
    },
    declination(n, titles) {
      return titles[
        n % 10 === 1 && n % 100 !== 11
          ? 0
          : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
            ? 1
            : 2
        ]
    },
    setAuthModalStatus(status, type = "") {
      this.setBodyOverflow(status)

      this.$store.dispatch("set", {
        name: "authModalStatus",
        value: status,
      });

      if (type) {
        this.$store.dispatch("set", {
          name: "authModalType",
          value: type,
        });
      }
    },
    setCartModalStatus(status) {
      this.setBodyOverflow(status)

      this.$store.dispatch("set", {
        name: "cartModalStatus",
        value: status,
      });
    },
    setFreeCourseModalStatus(status) {
      this.setBodyOverflow(status)

      this.$store.dispatch("set", {
        name: "freeCourseModalStatus",
        value: status,
      });
    },
    setSuccessModalStatus(status) {
      this.setBodyOverflow(status)

      this.$store.dispatch("set", {
        name: "showSuccessModal",
        value: status,
      });
    },
    setActivateFreeModal(status) {
      this.setBodyOverflow(status)

      this.$store.dispatch("set", {
        name: "showActivateFreeModal",
        value: status,
      });
    },
    setFreeModalStatus(status, id = 0) {
      this.setBodyOverflow(status)

      this.$store.dispatch("set", {
        name: "freeModalStatus",
        value: status,
      });

      this.$store.dispatch("set", {
        name: "freeCourseId",
        value: id,
      });
    },
    setGiftModalStatus(status, gift) {
      this.setBodyOverflow(status)
      this.$store.dispatch("set", {
        name: "showGiftModal",
        value: status,
      });
      this.$store.dispatch("set", {
        name: "gift",
        value: gift,
      });
    },
    setBodyOverflow(status) {
      const body = document.body

      if (status) {
        body.classList.add("app-hidden")
      } else {
        body.classList.remove("app-hidden")
      }
    },
    async getCart() {
      if (this.isAuth) {
        await this.$axios.get("/cart").then(r => {
          this.$store.dispatch("set", {
            name: "cart",
            value: r.data
          });
        });
      } else {
        const storageCart = localStorage.getItem("cart") ? localStorage.getItem("cart") : "[]";
        const cart = JSON.parse(storageCart);

        await this.$store.dispatch("set", {
          name: "cart",
          value: cart
        })
      }
    },
    async addToCart(id) {
      console.log('loading');
      if (this.isAuth) {
        const course = this.cart.find(c => +c.courseId === +id);
        if (course?.id) {
          return this.setCartModalStatus(true);
        }
        await this.$axios.post(`/cart/${id}`);
        await this.getCart();
      } else {
        const storageCart = localStorage.getItem("cart") ? localStorage.getItem("cart") : "[]";
        const cart = JSON.parse(storageCart);

        const course = cart.find(c => +c.courseId === +id);

        if (course) {
          return this.setCartModalStatus(true);
        }
        cart.push({
          courseId: id
        });

        await localStorage.setItem("cart", JSON.stringify(cart));
        await this.getCart();
      }
      this.cartAnimation(id);
    },
    async deleteFromCart(id) {
      const list = this.list.filter((element) => element.id !== id);
      this.list = [...list];
      const newCartsArray = this.$store.getters.cart.filter((element) => element.courseId !== id);
      this.$store.dispatch('set', {name: 'cart', value: newCartsArray});

      this.$axios.delete(`/cart/${id}`);
      const storageCart = localStorage.getItem("cart") ? localStorage.getItem("cart") : "[]";
      const cart = JSON.parse(storageCart);
      await localStorage.setItem("cart", JSON.stringify(cart.filter((element) => element.courseId !== id)));
      //await this.getCart();
    },
    cartAnimation(id) {
      const cart = document.querySelector('.app-header__cart').getBoundingClientRect();
      const card = document.querySelector(`[data-id="${id}"]`);
      const bodyPos = document.querySelector('body').getBoundingClientRect();
      const layout = document.getElementById('__layout');
      const clone = card.cloneNode(true);
      const cardPos = card.getBoundingClientRect();
      clone.style.position = 'absolute';
      clone.style.top = `${(cardPos.y + (-bodyPos.y))}px`;
      clone.style.left = `${(cardPos.x >= 0 ? cardPos.x + bodyPos.x : bodyPos.width / 2)}px`;
      clone.style.height = `${cardPos.height}px`;
      clone.style.transition = 'all 2s';
      clone.style.zIndex = '2';
      layout.appendChild(clone);
      
      setTimeout(() => {
        const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if(width >= 600){
          clone.style.top = `${(-bodyPos.y)}px`;
          clone.style.left = `${cart.left}px`;
        } else {
          clone.style.top = '0';
        }
        clone.style.opacity = 0;
        clone.style.transform = 'scale(0)';
      }, 0);

      setTimeout(() => clone.remove(), 3000);
    }
  },
})
