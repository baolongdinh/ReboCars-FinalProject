<template>
    <div class="ml-28 mr-28">

        <div class="grid grid-cols-4 gap-4 mt-12">
            <car></car>
            <car></car>
            <car></car>
            <car></car>
            <car></car>
            <car></car>
            <car></car>
            <car></car>
        </div>

    </div>
</template>

<script>
import Car from './Car.vue'

export default {
    components: { Car },
    setup() {


        return {}
    }
}
</script>

<style lang="scss" scoped></style>