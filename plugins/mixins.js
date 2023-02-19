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
    setSuccessModalStatus(status) {
      this.setBodyOverflow(status)

      this.$store.dispatch("set", {
        name: "showSuccessModal",
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
      if (this.isAuth) {
        const course = this.cart.find(c => +c.courseId === +id);
        if (course?.id) {
          return this.setCartModalStatus(true);
        }
        await this.$axios.post(`/cart/${id}`).catch(e => {
          console.log(e);
        });
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
        this.cartAnimation(id);
      }
    },
    cartAnimation(id) {
      const cart = document.querySelector('.app-header__cart-box').getBoundingClientRect();
      const card = document.querySelector(`[data-id="${id}"]`);
      const bodyPos = document.querySelector('body').getBoundingClientRect();
      const layout = document.getElementById('__layout');
      const clone = card.cloneNode(true);
      const cardPos = card.getBoundingClientRect();
      console.log(document.querySelector('body'));
      console.log(bodyPos, cardPos);
      clone.style.position = 'absolute';
      console.log(cardPos.y, bodyPos.y);
      clone.style.top = `${(cardPos.y + (-bodyPos.y))}px`;
      clone.style.left = `${(cardPos.x >= 0 ? cardPos.x + bodyPos.x : bodyPos.width / 2)}px`;
      clone.style.height = `${cardPos.height}px`;
      clone.style.transition = 'all 2s';
      clone.style.zIndex = '2';
      layout.appendChild(clone);
      
      setTimeout(() => {
        clone.style.top = `${(-bodyPos.y)}px`;
        clone.style.left = `${cart.left}px`;
        clone.style.opacity = 0;
        clone.style.transform = 'scale(0)';
      }, 0);

      setTimeout(() => clone.remove(), 3000);
    }
  },
})
