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
      gift: null,
      sale: 10,
      balance: 0,
      authModalStatus: false,
      freeCourseModalStatus: false,
      cartModalStatus: false,
      freeModalStatus: false,
      showActivateFreeModal: false,
      showSuccessModal: false,
      showGiftModal: false,
      freeCourseId: 0,
      authModalType: "",
      cart: [],
      mainPageInfo: {},
      stages: [],
      isReady: false,
      courses: [],
      smileColors: ['blue', 'green', 'purple', 'yellow']
    }),
    getters: {
      phone: state => state.phone,
      formattedPhone: state => state.phone.replace(/[^0-9]/g, ""),
      email: state => state.email,
      instagram: state => state.instagram,
      vkontakte: state => state.vkontakte,
      telegram: state => state.telegram,
      whatsApp: state => state.whatsApp,
      sale: state => +state.sale,
      gift: state => state.gift,
      authModalStatus: state => state.authModalStatus,
      freeCourseModalStatus: state => state.freeCourseModalStatus,
      cartModalStatus: state => state.cartModalStatus,
      freeModalStatus: state => state.freeModalStatus,
      showActivateFreeModal: state => state.showActivateFreeModal,
      showSuccessModal: state => state.showSuccessModal,
      authModalType: state => state.authModalType,
      freeCourseId: state => state.freeCourseId,
      showGiftModal: state => state.showGiftModal,
      cart: state => state.cart,
      mainPageInfo: state => state.mainPageInfo,
      isReady: state => state.isReady,
      balance: state => state.balance,
      courses: state => state.courses,
      stages: state => state.stages.map((element, idx) => (
        {
          ...element,
          name: element.title,
          color: state.smileColors[element.smileType - 1],
          active: (idx === 0) ? true : false,
          img: element.photos[0].name,
        }
      )),
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
