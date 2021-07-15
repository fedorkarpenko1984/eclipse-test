<template>
    <div class="center-x container pad-top1rem">
        <div class="flex-center-space-between">
            <div>
                <h3 class="font-color-grey fs16px roboto pad-left1rem">Основная валюта:</h3>

                <h2 class="font-color-blue fs24px roboto pad-left1rem">
                    {{basicCurrency.Name}}
                    <i>{{basicCurrency.CharCode}}</i>
                </h2>
            </div>

            <div class="flex-center-space-between">

                <h3 class="leftonade fs16px font-color-grey">ПОИСК</h3>

                <select class="font-color-blue roboto no-outline border-grey marg-left1rem font-bold"
                        v-model="searchMode">
                    <option value="Name">По названию</option>
                    <option value="CharCode">По коду</option>
                </select>

                <input class="border-grey roboto no-outline font-color-grey font-bold fs16px"
                       type="text"
                       v-model.trim="search" >

            </div>
        </div>

        <div class="pad-top1rem">
            <couple-of-currencies
                    v-for="currency in sortCurrencies"
                    :key="currency.CharCode"
                    :currency="currency"
                    :basic-currency="basicCurrency"></couple-of-currencies>
        </div>

    </div>
</template>

<script>

    import CoupleOfCurrencies from '../components/CoupleOfCurrencies'

    export default {
        components: { CoupleOfCurrencies },

        data: () => ({
            currencies: [], // список валют
            search: '',
            searchMode: 'Name'
        }),

        async mounted() {
            this.currencies = await this.$store.dispatch('getCurrencies')
        },

        computed: {

            // Базовая валюта, рубль РФ по умолчанию
            basicCurrency() {
                return this.$store.state.basicCurrency
            },

            // Возвращает отсортированый список, если поле ввода параметра сортировки не пустое
            sortCurrencies() {
                let result = []

                if (this.search) {

                    // Сортировка
                    this.currencies.forEach(cur => {
                        let searchIn = cur[this.searchMode].toUpperCase()

                        if (searchIn.indexOf(this.search.toUpperCase()) >= 0) {
                            result.unshift(cur)
                        } else {
                            result.push(cur)
                        }
                    })

                } else {
                    // если поле пустое, возвращает полученный из state массив
                    result = this.currencies
                }

                return result
            }

        }
    }
</script>

<style scoped>
.container {
    width: 610px;
}

</style>
