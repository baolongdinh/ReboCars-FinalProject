<template>
    <div class=" p-8 bg-white w-full relative rounded-lg">
        <div class="flex flex-col">
            <div v-if="userCar.name"
                class="text-bold font-sans text-xl rounded-xl text-white bg-green-400 max-w-fit px-6 text-center ">
                {{ userCar.name }}
            </div>

            <div class="flex mt-2">
                <div>
                    <img class=" max-w-xs w-48 h-150 rounded-lg" :src="getImage(userCar.images[0])">
                </div>

                <div class=" max-w-md ml-8 flex-col space-y-1 text-base font-normal text-gray-800">
                    <div v-if="userCar.location.description">
                        <span class="font-semibold">
                            Vị trí:
                        </span>
                        {{ userCar.location.description }}
                    </div>

                    <div class="flex">
                        <span class="font-semibold">
                            Trạng thái:
                        </span>
                        <div v-if="!userCar?.status" class="flex pl-1">
                            Không hoạt động
                            <img :src="redCumulus" alt="redCumulus">
                        </div>
                        <div v-else class="flex pl-1">
                            Đang hoạt động
                            <img :src="activeIcon" alt="activeIcon">
                        </div>

                    </div>

                    <div class="text-lg font-semibold">
                        Giá cho thuê: <span class="ml-2 text-green-400 font-bold text-xl">
                            {{ userCar.price }}K
                        </span>
                        <span class="text-gray-600 font-normal font-sans">
                            /ngày
                        </span>
                    </div>

                    <div class="flex space-x-4">
                        <div class="text-base font-normal">
                            <font-awesome-icon :icon="['fas', 'star']" style="color: #f7fb32;" />

                            <span v-if="!userCar.reviews.length" class="">
                                0.0
                            </span>
                            <span v-else class="">
                                {{ userCar.reviewAvg }}
                            </span>
                        </div>

                        <div class="text-base font-normal">
                            <font-awesome-icon :icon="['fas', 'car-rear']" size="lg" style="color: #17ba22;" />
                            <span class="pl-1">
                                {{ userCar.bookedNumber }} chuyến
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="absolute bottom-5 right-8">
            <button @click="handleClickCarInfo" class="bg-green-400 hover:bg-green-500 w-32 h-12 rounded-lg ">
                <div class="text-white font-sans font-semibold text-base">
                    Xem chi tiết
                </div>

            </button>

        </div>
    </div>
</template>

<script setup>
import activeIcon from "../../../../assets/icons/active.svg"
import redCumulus from "../../../../assets/icons/redCumulus.svg"

import { onMounted, inject } from "vue";

const emit = defineEmits(['handleClickCarInfo'])

const base_url = inject('base_url')
function getImage(url) {
    return base_url + url
}

const props = defineProps({
    userCar: Object
})

function handleClickCarInfo() {
    emit('handleClickCarInfo', props.userCar)
}

onMounted(() => {
    console.log({ props })
})


</script>

<style lang="scss" scoped></style>