<template>
    <div class="container">
        <h4 class="title fs16px font-color-grey leftonade">{{currency.Nominal > 1 ? currency.Nominal : ''}} {{currency.Name}}</h4>
        <div class="flex-center-space-between">
            <strong>{{currency.Nominal}}<i class="marg-left1rem font-bold roboto">{{currency.CharCode}}</i></strong>

            <strong></strong>

            <span class="leftonade">
                {{Math.round(((currency.Value / basicCurrency.Value) * basicCurrency.Nominal) * 10000) / 10000}}
                {{basicCurrency.CharCode}}
            </span>

            <span class="roboto" :class="{'green' : differenceOfRate > 0, 'red': differenceOfRate < 0}">
                {{differenceOfRate > 0 ? '&uarr;' : '&darr;'}}{{differenceOfRate}}
            </span>

            <button class="no-outline no-border font-bold leftonade"
                    @click="changeBasicCurrency(currency)"
            >
                сделать основной
            </button>
        </div>

    </div>
</template>

<script>
    export default {
        props: ['currency', 'basicCurrency'],
        data() {
            return {

            }
        },

        methods: {
            changeBasicCurrency(currency) {
                this.$store.commit('setBasicCurrency', currency)
            }

        },

        computed: {
            differenceOfRate() {
                // result = ромежуточная переменная

                let result = this.currency.Value - this.currency.Previous // Разница курса в рублях

                // пересчет в текущую основную валюту
                result = (result / this.basicCurrency.Value) * this.basicCurrency.Nominal

                result = Math.round(result * 10000) / 10000
                return result
            }
        }
    }
</script>

<style scoped>
.container {
    border: 1px solid slateblue;
    width: 600px;
    padding: 5px;
    border-radius: 5px;
    min-height: 50px;
    margin: 5px;
}

.title {
    width: 200px;
    margin-bottom: 5px;
}

.green {
    color: green
}

.red {
    color: red
}

</style>
