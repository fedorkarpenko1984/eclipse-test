<template>
    <div>
        <router-link class="link" to="/">Список валют</router-link>
        <router-link class="link" to="/converter">Конвертер</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        methods: {
            cons() {
                console.log(this.$store.state.currencies)
            }
        }
    }
</script>

<style scoped>
.link {
    text-decoration: none;
    font-size: 1rem;
    font-family: Roboto;
    margin: 1rem;
    color: grey
}
</style>
