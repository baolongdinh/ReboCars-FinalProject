<template>
    <div class="">
        <div class="header relative ml-28 mr-28">
            <img class="h-auto w-full rounded-2xl object-cover" src="https://wallpapers-fenix.eu/full/141205/161554157.jpg"
                alt="image description">
            <div class="z-40 absolute bottom-ne70 w-full ">
                <div class="font-sans text-white text-5xl font-medium text-center mb-72">
                    ReboCars - Cùng bạn đến mọi hành trình
                </div>
                <date-picker> </date-picker>
            </div>

        </div>

        <div class="">
            <promotions class="w-full"></promotions>
        </div>

        <div class="mt-24 bg-gray-100 pb-16">
            <div class=" font-sans  text-black text-5xl font-medium text-center">
                Xe Dành Cho Bạn
            </div>
            <listCars :listCars=cars @handleUserClickCarCard="handleUserClickCarCard"> </listCars>
        </div>

        <div class="pb-16">

            <special-places class="w-full" @handleSelectDiscount="handleSelectDiscount">

            </special-places>
        </div>

    </div>
</template>

<script setup>
import DatePicker from './DatePicker.vue'
import Promotions from './Promotions.vue'
import listCars from './cars/ListCars.vue'
import { useStore, mapGetters } from 'vuex'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const carStore = useStore()
const router = useRouter()
var cars = ref([])
const today = new Date();
const sevenDateLater = new Date(today.setDate(today.getDate() + 7));
const startDateTime = new Date()
const endDateTime = sevenDateLater
const location = {
    compound: {
        province: "Hồ Chí Minh",
    },
}
var page = 1
var limit = 12
const filterPayload = {
    startDateTime, endDateTime, location
}

async function updateListCars(page, limit, filterPayload) {
    cars.value = await carStore.dispatch('findCarsFilter', { page, limit, filterPayload })
}

function handleUserClickCarCard(carId) {
    router.push({
        name: "car", params: { id: carId },
        query: {
            startDateTime,
            endDateTime
        }
    })
}



onMounted(() => {
    updateListCars(page, limit, filterPayload)
})


</script>

<style lang="css" scoped>
.modal-open {
    overflow: initial;
    align-self: flex-end;
}
</style>