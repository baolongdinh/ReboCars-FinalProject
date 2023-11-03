<template>
    <div>
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
            <promotions @handleSelectDiscount="handleSelectDiscount" class="w-full"></promotions>
        </div>

        <div class="mt-24 bg-gray-100">
            <div class=" font-sans  text-black text-5xl font-medium text-center">
                Xe Dành Cho Bạn
            </div>
            <listCars :listCars=cars @handleUserClickCarCard="handleUserClickCarCard"> </listCars>
        </div>

        <div class="opacity-80 bg-gray-800 fixed z-200 inset-0" v-if="showPromotionDetailModal">
            <PromotionDetailModal ref="promotionModal" v-if="promotionSelected" :promotion="promotionSelected"
                class=" overflow-y-auto h-11/12 px-465 py-32 absolute top-3/4  " v-model="showPromotionDetailModal"
                @logout="hidePromotionDetailDialog">
            </PromotionDetailModal>
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

//handle btn show promotion detail
const promotionSelected = ref()
const showPromotionDetailModal = ref(false)

function showPromotionDetailDialog() {
    showPromotionDetailModal.value = true
}

function hidePromotionDetailDialog() {
    showPromotionDetailModal.value = false
}

function handleSelectDiscount(promotion) {
    console.log({ promotion })
    promotionSelected.value = promotion
    showPromotionDetailDialog()
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