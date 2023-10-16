<template>
    <div class="ml-28 mr-28">

        <div class="grid grid-cols-4 gap-4 mt-12">
            <div v-for="car in listCars" :key="car._id" @click="handleUserClickCarCard(car._id)">
                <Car :car=car />
            </div>
        </div>

    </div>
</template>

<script>

import { defineAsyncComponent, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const Car = defineAsyncComponent(() =>
    import('./Car.vue')
)

export default {
    components: { Car },
    props: {
        listCars: Array,
    },
    setup(props, { emit }) {

        function handleUserClickCarCard(carId) {
            emit("handleUserClickCarCard", carId)

            // router.push({ name: "car", params: { id: carId }, query: { startDateTime: props.startDateTime, endDateTime: props.endDateTime, location: stringifyLocation } })
        }

        return {
            handleUserClickCarCard
        }
    }
}
</script>

<style lang="scss" scoped></style>