<template>
    <div>
        <div class="w-305 h-415 bg-white rounded-2xl shadow-xl ">
            <div class="p-4 relative">
                <div class="relative">
                    <img class="h-auto w-full rounded-2xl object-cover" :src="getImage(car.images[0])">

                    <div v-if="car.discount"
                        class="absolute w-20 h-8 bg-orange-500 text-white font-semibold text-sm  rounded-3xl bottom-ne16 right-5 text-center p-de5">
                        Giảm {{ car.discount }} %
                    </div>


                </div>

                <div class=" mt-4 ">
                    <div class="flex">
                        <div v-if="car?.characteristics?.transmission"
                            class="bg-blue-200   text-black py-2 px-4 rounded-xl font-sans font-normal  text-xxm">
                            {{ car.characteristics.transmission }}
                        </div>

                        <div v-if="car?.car_delivery"
                            class="bg-pink-100   text-black py-2 px-4 rounded-xl font-sans font-normal  text-xxm">
                            Giao xe tận nơi
                        </div>
                    </div>
                </div>

                <div v-if="car?.name" class=" mt-2 font-sans ">
                    <div class="text-lg font-bold text-black flex">
                        <div>
                            {{ car.name }}
                        </div>
                        <div class="pl-1">
                            <img :src="activeIcon">
                        </div>

                    </div>
                    <div class="mt-2 text-sm font-normal text-black flex ">

                        <font-awesome-icon :icon="['fas', 'location-dot']" size="lg" />

                        <div v-if="car?.location?.compound?.district && car?.location?.compound?.province" class="ml-1">
                            {{ car.location.compound.district }}, {{ car.location.compound.province }}
                        </div>

                    </div>
                </div>

                <div class="mt-5">
                    <hr class="h-px bg-gray-200 border-0 dark:bg-gray-300">

                    <div class=" mt-1 font-sans font-normal text-sm flex">
                        <div v-if="car?.reviewRateAvg">
                            <font-awesome-icon :icon="['fas', 'star']" style="color: #f7fb32;" />
                            {{ car.reviewRateAvg }}
                        </div>
                        <div v-else>
                            <font-awesome-icon :icon="['fas', 'star']" style="color: #f7fb32;" />
                            0
                        </div>

                        <div v-if="car.bookedNumber" class="ml-2">
                            <font-awesome-icon :icon="['fas', 'car-rear']" size="lg" style="color: #17ba22;" />
                            {{ car.bookedNumber }}
                        </div>
                        <div v-else class="ml-2">
                            <font-awesome-icon :icon="['fas', 'car-rear']" size="lg" style="color: #17ba22;" />
                            0
                        </div>

                    </div>
                </div>

                <div class="mt-5 relative flex font-sans">

                    <div class="pl-1 font-bold text-xl text-green-400 absolute right-0 flex">

                        <div v-if="car.discount > 0" class="text-gray-400 font-normal text-base pt-1 line-through">
                            {{ car.price }}K
                        </div>

                        <div class="pl-1" v-if="car.discount > 0">
                            {{ car.discountPrice.toFixed() }}K
                        </div>

                        <div v-if="car.price && car.discount === 0">
                            {{ car.price }}K
                        </div>

                        <div class="text-gray-400 font-normal text-base pt-1 pl-2">
                            / ngày
                        </div>

                    </div>

                </div>


            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue"
import activeIcon from "../../../assets/icons/active.svg"

const base_url = inject('base_url')

function getImage(url) {
    return base_url + url
}

function convertNumToPrice(num) {
    return parseInt(num).toLocaleString().replaceAll(',', ' ')
}

const props = defineProps({
    car: Object
})


</script>

<style lang="scss" scoped></style>