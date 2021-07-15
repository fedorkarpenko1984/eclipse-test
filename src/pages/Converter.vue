<template>
    <div class="converter center-x pad-top1rem">
        <div class="container">
            <div class="font-color-grey fs24px leftonade">
                {{ firstCurrency.Name }}
            </div>


            <div class="flex-center-space-between">
                <div class="currencyCode">
                    {{ firstCurrency.CharCode }}
                </div>
                <input type="text" class="input border-bottom-blue" v-model.number.trim="input">
            </div>

            <button class="select font-bold font-color-grey"
                    @click="currencyListUpdate(0)"
            >Выбирите валюту</button>

            <button class="selectInput"
                    v-for="currency in currencyLists[0]"
                    :key="currency.CharCode"
                    @click="changeCurrency(0, currency)"
            >
                {{ currency.Name }} {{ currency.CharCode }}
            </button>

            <h3>{{}}</h3>

        </div>

        <div class="container">
            <div class="fs24px leftonade font-color-grey">
                {{ secondCurrency.Name }}
            </div>

            <div class="flex-center-space-between">
                    <input class="input" type="text" :value="output" readonly>
                    <strong  class="currencyCode mr-15rem">
                        {{ secondCurrency.CharCode }}
                    </strong>
            </div>

            <button class="select font-bold font-color-grey"
                    @click="currencyListUpdate(1)"
            >Выбирите валюту</button>

            <button class="selectInput"
                    v-for="currency in currencyLists[1]"
                    :key="currency.CharCode"
                    @click="changeCurrency(1, currency)"
            >
                {{ currency.Name }} {{ currency.CharCode }}
            </button>

        </div>
    </div>
</template>

<script>
    export default {

        data() {
            return {
                firstCurrency: this.$store.state.currencies[1],
                secondCurrency: this.$store.state.currencies[0],
                currencyLists: [
                    [],
                    []
                ],
                listIsShowing: [false, false],

                input: 0

            }
        },

        beforeCreate() {
            console.log('before', this.$store.state.isLoaded)
            if (!this.$store.state.isLoaded) {
                console.log('push')
                this.$router.push('/')
            }
        },

        computed: {

            // Результат конвертирования
            output() {

                let result = this.firstCurrency.Value / this.firstCurrency.Nominal
                result = result / this.secondCurrency.Value * this.secondCurrency.Nominal
                result = result * this.input
                result = Math.round(result * 10000) / 10000
                return result
            }
        },



        methods: {

            changeCurrency(listID, currency) {
                if (!listID) {
                    this.firstCurrency = currency
                } else {
                    this.secondCurrency = currency
                }

            },

            currencyListUpdate(listID) {
                if (this.listIsShowing[listID]) {
                    this.currencyListReset(listID)
                } else {
                    this.setCurrencyList(listID)
                }
            },


            setCurrencyList(listID) {
                this.listIsShowing[listID] = true
                this.currencyLists[listID] = this.$store.state.currencies.filter(currency => {
                    // Вспомогательная переменная
                    let curr = listID ===  0 ? this.firstCurrency : this.secondCurrency
                    return currency !== curr
                })
            }
            ,

            currencyListReset(listID) {
                this.listIsShowing[listID] = false
                this.currencyLists[listID] = []
            }
    }



    }
</script>

<style scoped>

.converter {
    display: flex;
    width: 1000px;
}
.select {
    height: 25px;
    width: 200px    ;
    background-color: lightblue;
    border: none;
    font-family: Roboto;
    font-size: 1rem;
    border-radius: 4px;
    outline: none;
    padding: 5px;
    margin: 5px;
}
.selectInput {
    display: block;
    width: 350px;
    margin-top: 1px;
    background-color: lightgrey;
    border: none;
    font-family: Roboto;
    border-radius: 4px;
    outline: none;
}

.currencyCode {
    width: 50px;
    font-size: 2.5rem;
    font-family: Leftonade;
    color: darkslategray;
}

.input {
    width: 200px;
    margin-right: 5rem;
    border: none;
    font-size: 2.5rem;
    color:grey;
}

.border-bottom-blue {
    border-bottom: 1px solid lightblue;
}

.container {
    width: 500px;
}
.mr-15rem {
    margin-right: 25rem;
}
</style>
