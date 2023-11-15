<template>
    <div class="container  mx-auto ">
        <div class="px-28 pb-8">

            <div class="px-12 pt-4 pb-6 text-center text-gray-700 font-bold text-3xl font-sans">
                THÔNG TIN XE CHI TIẾT
            </div>

            <button type="button"
                class="absolute top-28 left-24 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-12 h-12 ms-auto inline-flex justify-center items-center "
                data-modal-hide="static-modal" @click="handBtnBack">
                <svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 -960 960 960" width="36">
                    <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
                </svg>

            </button>

            <div v-if="car.images" class="grid-cols-3 space-y-2 lg:space-y-0 lg:grid lg:gap-3 lg:grid-rows-2 relative">
                <div class="w-full col-span-2 row-span-3  ">
                    <img class="rounded-xl" loading="lazy" alt="Cho thuê xe tự lái MERCEDES MAYBACH S450 4MATIC 2018"
                        :src="getImage(car.images[0])">
                </div>
                <div class="w-full rounded-xl">
                    <img class="rounded-xl" loading="lazy" alt="Cho thuê xe tự lái MERCEDES MAYBACH S450 4MATIC 2018"
                        :src="getImage(car.images[1])">
                </div>

                <div class="w-full rounded-xl">
                    <img class="rounded-xl" loading="lazy" alt="Cho thuê xe tự lái MERCEDES MAYBACH S450 4MATIC 2018"
                        :src="getImage(car.images[2])">
                </div>

                <button @click="showUpdateCarImagesDialog"
                    class="bg-blue-500 hover:bg-blue-700 px-3 py-2 absolute bottom-4 left-0 text-white font-semibold rounded-lg">
                    Chỉnh sửa hình ảnh xe
                </button>
            </div>

            <div class="grid-cols-6 space-y-2 lg:space-y-0 lg:grid lg:gap-3 relative">

                <button @click="showUpdateCarDialog"
                    class="bg-blue-500 hover:bg-blue-700 px-3 py-2 absolute top-5 right-56 text-white font-semibold rounded-lg">
                    Chỉnh sửa thông tin xe
                </button>

                <div v-if="car?.name" class="w-full col-span-5 grid gap-y-6 divide-gray-300 divide-y">
                    <div class="font-semibold text-4xl ">
                        {{ car.name }}
                    </div>

                    <div class="font-medium text-xl pt-6">
                        Đặc điểm

                        <div class="grid grid-cols-4 gap-6 pt-6">

                            <div class="flex gap-2">
                                <div>
                                    <img :src="seatIcon" alt="seatIcon" id="seatIcon">
                                </div>

                                <label for="seatIcon" class="grid grid-rows-2 leading-none gap-2 ">
                                    <div class="font-normal text-base text-gray-500 ">
                                        Số ghế
                                    </div>
                                    <div v-if="car?.characteristics?.seats" class="font-medium text-lg">
                                        {{ car.characteristics.seats }}
                                    </div>
                                </label>
                            </div>

                            <div class="flex gap-2">
                                <div>
                                    <img :src="transmissionIcon" alt="transmissionIcon" id="transmissionIcon">
                                </div>

                                <label for="transmissionIcon" class="grid grid-rows-2 leading-none gap-2 ">
                                    <div class="font-normal text-base text-gray-500 ">
                                        Truyền động
                                    </div>
                                    <div v-if="car?.characteristics?.transmission" class="font-medium text-lg">
                                        {{ car.characteristics.transmission }}
                                    </div>
                                </label>
                            </div>

                            <div class="flex gap-2">
                                <div>
                                    <img :src="fuelIcon" alt="fuelIcon" id="fuelIcon">
                                </div>

                                <label for="fuelIcon" class="grid grid-rows-2 leading-none gap-2 ">
                                    <div class="font-normal text-base text-gray-500 ">
                                        Nhiên liệu
                                    </div>
                                    <div v-if="car?.characteristics?.fuel" class="font-medium text-lg">
                                        {{ car.characteristics.fuel }}
                                    </div>
                                </label>
                            </div>

                            <div class="flex gap-2">
                                <div>
                                    <img :src="sfcIcon" alt="sfcIcon" id="sfcIcon">
                                </div>

                                <label for="sfcIcon" class="grid grid-rows-2 leading-none gap-2 ">
                                    <div class="font-normal text-base text-gray-500 ">
                                        NL tiêu hao
                                    </div>
                                    <div v-if="car?.characteristics?.sfc_100km" class="font-medium text-lg">
                                        {{ car.characteristics.sfc_100km }}L/100km
                                    </div>
                                </label>
                            </div>


                        </div>

                    </div> <!--  end dac diem // -->

                    <div class="font-medium text-xl pt-6">
                        Mô tả
                        <div v-if="car?.description" class="font-normal text-base text-gray-500 pt-4 ">
                            {{ car.description }}
                        </div>
                    </div>


                    <div class="font-medium text-xl pt-6">
                        Các tiện nghi khác
                        <div class="font-normal text-base text-gray-800 pt-4 grid grid-cols-4 gap-2 ">
                            <div v-for="feature in car.features" :key="feature">
                                {{ feature }}
                            </div>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div class="font-medium text-xl pt-2">
                            Thông tin cho thuê
                        </div>

                        <div class="grid grid-cols-2 gap-4 font-normal text-md text-gray-900">
                            <div>
                                Đơn giá thuê:
                                <span v-if="car?.price" class="font-bold text-lg pl-3">
                                    {{ car.price }}K/ngày
                                </span>
                            </div>

                            <div v-if="car?.discount">
                                Giảm giá:
                                <span class="font-bold text-lg pl-3">
                                    {{ car.discount }}%
                                </span>
                            </div>

                            <div v-if="car?.car_delivery">
                                Quãng đường thuê xe tối đa:
                                <span class="font-bold text-lg pl-3">
                                    {{ car.max_distance_delivery }}km
                                </span>
                            </div>

                            <div v-if="car?.car_delivery">
                                Phí giao nhận xe cho mỗi km:
                                <span class="font-bold text-lg pl-3">
                                    {{ car.delivery_price_1km }}K
                                </span>
                            </div>

                            <div v-if="car?.car_delivery">
                                Miễn phí giao nhận xe trong vòng:
                                <span class="font-bold text-lg pl-3">
                                    {{ car.max_delivery_free_price }}km
                                </span>
                            </div>

                            <div v-if="car?.max_km_per_day">
                                Số km tối đa trong 1 ngày:
                                <span class="font-bold text-lg pl-3">
                                    {{ car.max_distance_per_day }}km
                                </span>
                            </div>

                            <div v-if="car?.max_km_per_day">
                                Phí vượt giới hạn: <span class="text-sm"> (tính mỗi km)</span>
                                <span class="font-bold text-lg pl-3">
                                    {{ car.over_distance_per_km_price }}K
                                </span>
                            </div>
                        </div>
                    </div>

                    <div v-if="car?.location" class="font-medium text-xl pt-6 relative">
                        Vị trí xe

                        <div class="text-base pt-3 pb-1 pl-3 text-gray-600">
                            {{ car.location.description }}

                        </div>


                        <div ref="mapContainer" class=" h-355 w-full mt-4">

                        </div>
                    </div>
                    <div class="font-medium text-xl pt-6">
                        Reviews

                        <div class="flex flex-col">
                            <div class="mt-1 flex">
                                <div v-if="car?.reviewRateAvg">
                                    <font-awesome-icon :icon="['fas', 'star']" style="color: #f7fb32;" />
                                    {{ car.reviewRateAvg }}
                                </div>
                                <div v-else>
                                    <font-awesome-icon :icon="['fas', 'star']" style="color: #f7fb32;" />
                                    0
                                </div>

                                <div class=" font-normal text-base pt-1 pl-2">
                                    {{ car.reviews.length }} đánh giá
                                </div>

                            </div>

                            <div>
                                <div v-for="review in car.reviews" :key="review">
                                    <ReviewCard :review="review" />
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>


        <div class="opacity-80 bg-gray-800 fixed z-40 inset-0" v-if="showUpdateCarModal">

            <UpdateCarModal v-if="car" :car="car"
                class="overflow-y-auto opacity-100 z-50 bg-gray-100 w-650 absolute mx-auto inset-0 "
                v-model="showUpdateCarModal" @logout="hiddenUpdateCarDialog"
                @handleBtnConfirmUpdateCarInfo="handleBtnConfirmUpdateCarInfo">
            </UpdateCarModal>

        </div>

        <div class="opacity-80 bg-gray-800 fixed z-40 inset-0" v-if="showUpdateCarImagesModal">

            <UpdateCarImagesModal v-if="car" :car="car"
                class="overflow-y-auto opacity-100 z-50 bg-gray-100 w-650 absolute mx-auto inset-0 "
                v-model="showUpdateCarImagesModal" @logout="hiddenUpdateCarImagesDialog"
                @handleBtnConfirmUpdateCarImages="handleBtnConfirmUpdateCarImages">
            </UpdateCarImagesModal>

        </div>

    </div>
</template>

<script setup>
import seatIcon from "../../../../assets/icons/seats.svg"
import transmissionIcon from "../../../../assets/icons/transmission.svg"
import fuelIcon from "../../../../assets/icons/fuel.svg"
import sfcIcon from "../../../../assets/icons/sfc.svg"
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted, shallowRef, provide, inject } from "vue"
import gongAPI from "../../../../apis/goongMapAPI/api"
import goongAPIKey from "../../../../configs/apikey.config"
import { useStore, mapGetters } from 'vuex'
import { router } from '../../../../routers'
import UpdateCarModal from './UpdateCarModal.vue'
import UpdateCarImagesModal from "./UpdateCarImagesModal.vue"



const store = useStore()
const route = useRoute()
const car = ref({})

const base_url = inject('base_url')
function getImage(url) {
    return base_url + url
}

// modal 
const showUpdateCarModal = ref(false)

function showUpdateCarDialog() {
    showUpdateCarModal.value = true
}

function hiddenUpdateCarDialog() {
    showUpdateCarModal.value = false
}


const showUpdateCarImagesModal = ref(false)

function showUpdateCarImagesDialog() {
    showUpdateCarImagesModal.value = true
}

function hiddenUpdateCarImagesDialog() {
    showUpdateCarImagesModal.value = false
}

async function handleBtnConfirmUpdateCarImages() {
    await findCarByIdAndSetValue(route.params.id)
    hiddenUpdateCarImagesDialog()
}

async function handleBtnConfirmUpdateCarInfo() {
    await findCarByIdAndSetValue(route.params.id)
    hiddenUpdateCarDialog()
}

///


const mapContainer = shallowRef(null)
const map = shallowRef(null)

function handBtnBack() {
    router.push({ path: '/usercarsdashboard/mylistcars' })
}

async function findCarByIdAndSetValue(id) {
    car.value = await store.dispatch("findCarById", id)
}

async function loadMap() {

    const { lat, lng } = car.value.location.geometry
    console.log({ lat, lng })
    map.value = await gongAPI.loadMap(lng, lat, mapContainer.value, 12)
}

onMounted(async () => {
    await findCarByIdAndSetValue(route.params.id)
    console.log(car.value)
    loadMap()
})


</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .4s linear;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
    transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
    opacity: 0;
    transform: scale(0.3) translateY(-50%);
}

/* @import "https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.css" */
</style>