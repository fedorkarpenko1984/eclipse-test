import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({

  state: {

    currencies: [],  // Поле для массива с данными валют,
    //Базовая валюта, рубль РФ по умолчанию
    basicCurrency: {CharCode: "RUB", Name: "Российский рубль", Nominal: 1, Previous: 1, Value: 1},
    isLoaded: false
  },

  getters: {

  },


  mutations: {

    // Сеттер для установки значения массива
    setCurrencies(state, payload) {
      state.currencies = payload
      console.log('setCur', state.currencies)
    },

    setIsLoaded(state) {
      state.isLoaded = true
    },

    // Переключение основной валюты
    setBasicCurrency(state, payload) {
      state.basicCurrency = payload
    }
  },

  actions: {


    // Получение курса валют через API ЦБРФ
    async getCurrencies({ commit, state }) {
      let currencies = (await axios.get('https://www.cbr-xml-daily.ru/daily_json.js')).data.Valute

      // Преобразование нужных данных в массив и добавление элемента с инфо о рубле РФ
      currencies = await Object.values(currencies)
      currencies.unshift(state.basicCurrency)


      await commit('setCurrencies', currencies)
      commit('setIsLoaded')


      return currencies
    }

  },

  modules: {
  }
})
