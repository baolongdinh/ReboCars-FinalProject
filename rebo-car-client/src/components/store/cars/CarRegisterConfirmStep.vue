<template>
    <div class="p-8 font-sans flex flex-col space-y-4">
        <div class="space-y-4 divide-y-2 divide-gray-100 ">
            <div class="space-y-4">
                <div class="font-bold text-2xl text-center">
                    Xác nhận thông tin xe
                </div>

                <div class="font-bold text-xl text-center pt-2">
                    {{ carRegistration.name }}
                </div>

                <div class="grid grid-cols-3 gap-3">
                    <div v-for="image in carRegistration.preview_list " :key="image">
                        <img class="rounded-lg" loading="lazy" alt="Cho thuê xe tự lái VINFAST LUX SA 2.0 2021"
                            :src="image">
                    </div>
                </div>
            </div>


            <div class="space-y-4">
                <div class="font-bold text-xl pt-2">
                    Thông tin xe
                </div>

                <div class="grid grid-cols-2 gap-4 font-semibold text-md text-gray-900 ">
                    <div>
                        Biển số xe:
                        <span class="font-bold text-lg pl-3">
                            {{ carRegistration.identifyNumber }}
                        </span>
                    </div>

                    <div>
                        Hãng xe:
                        <span class="font-bold text-lg pl-3">
                            {{ characteristics.autoMaker }}
                        </span>
                    </div>

                    <div>
                        Số ghế:
                        <span class="font-bold text-lg pl-3">
                            {{ characteristics.seats }}
                        </span>
                    </div>

                    <div>
                        Năm sản xuất:
                        <span class="font-bold text-lg pl-3">
                            {{ characteristics.yearOfManufacture }}
                        </span>
                    </div>
                    <div>
                        Tuyển động:
                        <span class="font-bold text-lg pl-3">
                            {{ characteristics.transmission }}
                        </span>
                    </div>
                    <div>
                        Loại nhiên liệu:
                        <span class="font-bold text-lg pl-3">
                            {{ characteristics.fuel }}
                        </span>
                    </div>
                    <div>
                        Mức tiêu thụ nhiên liệu:
                        <span class="font-bold text-lg pl-3">
                            {{ characteristics.sfc_100km }}L/Km
                        </span>
                    </div>

                </div>
            </div>

            <div class="space-y-4">
                <div class="font-bold text-xl pt-2">
                    Tính năng
                </div>

                <div class="grid grid-cols-4 gap-2">
                    <div v-for="feature in carRegistration.features" :key="feature">
                        <span>
                            {{ feature }}
                        </span>

                    </div>
                </div>
            </div>


            <div class="space-y-4">
                <div class="font-bold text-xl pt-2">
                    Thông tin cho thuê
                </div>

                <div class="grid grid-cols-2 gap-4 font-semibold text-md text-gray-900">
                    <div>
                        Đơn giá thuê:
                        <span class="font-bold text-lg pl-3">
                            {{ carRegistration.price }}K/ngày
                        </span>
                    </div>

                    <div>
                        Giảm giá:
                        <span class="font-bold text-lg pl-3">
                            {{ carRegistration.discount }}%
                        </span>
                    </div>

                    <div>
                        Quãng đường thuê xe tối đa:
                        <span class="font-bold text-lg pl-3">
                            {{ carRegistration.max_distance_delivery }}km
                        </span>
                    </div>

                    <div>
                        Phí giao nhận xe cho mỗi km:
                        <span class="font-bold text-lg pl-3">
                            {{ carRegistration.delivery_price_1km }}K
                        </span>
                    </div>

                    <div>
                        Miễn phí giao nhận xe trong vòng:
                        <span class="font-bold text-lg pl-3">
                            {{ carRegistration.max_delivery_free_price }}km
                        </span>
                    </div>
                </div>


                <div class="font-semibold text-md text-gray-900">
                    Địa chỉ:
                    <span class="font-bold text-lg pl-3 text-gray-900">
                        {{ location.description }}
                    </span>
                </div>

            </div>

        </div>
    </div>
</template>

<script setup>
import { onMounted, defineEmits, ref, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import Slider from '@vueform/slider'

defineExpose({
    handleNextBtnClick
})

const emit = defineEmits(['can-continue'])
const props = defineProps(['clickedNext', 'currentStep'])

const carStore = useStore()
const carRegistration = carStore.getters.getCarRegistration
const characteristics = JSON.parse(carRegistration.characteristics)
const location = JSON.parse(carRegistration.location)
onMounted(() => {
    emit('can-continue', { value: true })
    console.log({ carRegistration })
})

function handleNextBtnClick() {
    console.log('complete step')
}

onBeforeUnmount(() => {
    console.log('un mount step 3')
})

</script>

<style src="@vueform/slider/themes/default.css"></style>