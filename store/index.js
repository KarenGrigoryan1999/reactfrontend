import Vuex from "vuex"

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      phone: "",
      email: "",
      instagram: "",
      vkontakte: "",
      telegram: "",
      whatsApp: "",
      sale: 10,
      authModalStatus: false,
      cartModalStatus: false,
      freeModalStatus: false,
      showSuccessModal: false,
      freeCourseId: 0,
      authModalType: "",
      cart: [],
      mainPageInfo: {}
    }),
    getters: {
      phone: state => state.phone,
      formattedPhone: state => state.phone.replace(/[^0-9]/g, ""),
      email: state => state.email,
      instagram: state => state.instagram,
      vkontakte: state => state.vkontakte,
      telegram: state => state.telegram,
      whatsApp: state => state.whatsApp,
      sale: state => state.sale,
      authModalStatus: state => state.authModalStatus,
      cartModalStatus: state => state.cartModalStatus,
      freeModalStatus: state => state.freeModalStatus,
      showSuccessModal: state => state.showSuccessModal,
      authModalType: state => state.authModalType,
      freeCourseId: state => state.freeCourseId,
      cart: state => state.cart,
      mainPageInfo: state => state.mainPageInfo
    },
    actions: {
      set({ commit }, { name, value }) {
        commit("set", { name, value })
      },
    },
    mutations: {
      set(state, { name, value }) {
        state[name] = value
      },
    },
  })
}

export default createStore
