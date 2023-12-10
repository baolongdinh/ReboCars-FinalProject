<template>
    <VueFinalModal class="justify-center items-center absolute "
        content-class="flex flex-col bg-gray-100 text-black rounded-lg space-y-2  ">



        <div class="px-12 pt-12 pb-2 font-sans flex flex-col space-y-4 relative">

            <div class=" text-center font-semibold text-3xl pb-6">
                Chỉnh sửa thông tin xe
            </div>

            <button type="button" @click="this.$emit('logout')"
                class=" absolute top-1 right-5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span class="sr-only">Close modal</span>
            </button>




            <div class="flex flex-col space-y-1">
                <div class="font-semibold text-xl">
                    Đơn giá thuê mặc định
                </div>
                <div class="font-normal text-gray-500 text-sm">
                    Đơn giá thuê áp dụng cho tất cả các ngày
                </div>

                <div class="font-normal text-gray-500 text-sm">
                    Ví dụ: 350K
                </div>

                <div>
                    <input id="price" type="text" class="w-305 h-11 rounded-lg border-gray-300 focus:border-blue-500"
                        v-model="price">
                    <label for="price" class="pl-1">K/ngày</label>
                </div>
            </div>

            <div class="flex flex-col space-y-1">
                <div class="font-semibold text-xl">
                    Giảm giá
                </div>
                <div class="font-normal text-gray-500 text-sm">
                    Giảm giá thuê trên đơn giá
                </div>

                <div class="pt-10 w-335 pl-1">
                    <Slider v-model="discountValue" :min="0" :max="75" :step="1" :showTooltip="focus"
                        :format="discountSliderFormat" :tooltipPosition="bottom" />
                </div>

                <div class="font-normal text-gray-500 text-sm pt-3">
                    Giảm đề xuất: 15%
                </div>

            </div>

            <div class="flex flex-col space-y-1 pt-3">
                <div class="font-semibold text-xl">
                    Địa chỉ xe
                </div>
                <div class="pt-2">
                    <InputAutoCompletePlace :searchValue="carLocation?.description" @selectedValue="handleSelectedLocation">
                    </InputAutoCompletePlace>
                </div>
            </div>

            <div class="flex flex-col space-y-1 pt-3">
                <div class="flex justify-between">
                    <div class="font-semibold text-xl">
                        Giao xe tận nơi
                    </div>
                    <div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="showCarDelivery" class="sr-only peer">
                            <div
                                class="w-12 h-6 rounded-md bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500">
                            </div>
                        </label>
                    </div>

                </div>

                <div v-if="showCarDelivery" class="mt-3 grid grid-cols-2 gap-6">
                    <div>
                        <div class="font-normal text-gray-700 text-base">
                            Quãng đường thuê xe tối đa
                        </div>

                        <div class="pt-10  pl-1">
                            <Slider v-model="deliverDistanceValue" :min="5" :max="50" :step="1" :showTooltip="focus"
                                :format="DeliveryDistanceSliderFormat" :tooltipPosition="bottom" />
                        </div>

                        <div class="font-semibold text-gray-400 text-sm pt-2">
                            Quãng đường đề xuất 7km
                        </div>
                    </div>

                    <div>
                        <div class="font-normal text-gray-700 text-base">
                            Phí giao nhận xe cho mỗi km
                        </div>

                        <div class="pt-10  pl-1">
                            <Slider v-model="deliverPriceValue" :min="1" :max="30" :step="1" :showTooltip="focus"
                                :format="DeliveryPriceSliderFormat" :tooltipPosition="bottom" />
                        </div>

                        <div class="font-semibold text-gray-400 text-sm pt-2">
                            Phí đề xuất 10k
                        </div>
                    </div>

                    <div>
                        <div class="font-normal text-gray-700 text-base">
                            Miễn phí giao nhận xe trong vòng
                        </div>

                        <div class="pt-10  pl-1">
                            <Slider v-model="freeDeliverDistanceValue" :min="0" :max="50" :step="1" :showTooltip="focus"
                                :format="FreeDeliveryDistanceSliderFormat" :tooltipPosition="bottom" />
                        </div>

                        <div class="font-semibold text-gray-400 text-sm pt-2">
                            Quãng đường đề xuất 0km
                        </div>
                    </div>

                </div>


            </div>

            <div class="flex flex-col space-y-1 pt-3">
                <div class="flex justify-between">
                    <div class="font-semibold text-xl">
                        Giới hạn số Km
                    </div>
                    <div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="showMaxCarDelivery" class="sr-only peer">
                            <div
                                class="w-12 h-6 rounded-md bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500">
                            </div>
                        </label>
                    </div>

                </div>

                <div v-if="showMaxCarDelivery" class="mt-3 grid grid-cols-2 gap-6">
                    <div>
                        <div class="font-normal text-gray-700 text-base">
                            Số km tối đa trong 1 ngày
                        </div>

                        <div class="pt-10  pl-1">
                            <Slider v-model="maxKmPerDayValue" :min="300" :max="500" :step="5" :showTooltip="focus"
                                :format="DeliveryDistanceSliderFormat" :tooltipPosition="bottom" />
                        </div>

                        <div class="font-semibold text-gray-400 text-sm pt-2">
                            Số km đề xuất: 400km
                        </div>
                    </div>

                    <div>
                        <div class="font-normal text-gray-700 text-base">
                            Phí vượt giới hạn
                            <span class="font-light text-sm"> (tính mỗi km)</span>
                        </div>

                        <div class="pt-10  pl-1">
                            <Slider v-model="overLimitFee" :min="1" :max="5" :step="1" :showTooltip="focus"
                                :format="DeliveryPriceSliderFormat" :tooltipPosition="bottom" />
                        </div>

                        <div class="font-semibold text-gray-400 text-sm pt-2">
                            Phí đề xuất 3k
                        </div>
                    </div>
                </div>

            </div>

            <div class="flex flex-col space-y-1">
                <div class="font-semibold text-xl">
                    Mô tả
                </div>
                <div class="font-normal text-gray-500 text-sm">
                    Mô tả thông tin xe
                </div>

                <div>
                    <textarea class="w-580 h-36 rounded-lg border-gray-300 focus:border-blue-500 text-gray-700" name=""
                        id="" v-model="description" cols="30" rows="10"
                        placeholder="Huyndai Elantra số tự động đăng kí tháng 06/2018. Xe gia đình mới đẹp, nội thất nguyên bản, sạch sẽ, bảo dưỡng thường xuyên, rửa xe miễn phí cho khách. Xe rộng rãi, an toàn, tiện nghi, phù hợp cho gia đình du lịch. Xe trang bị hệ thống cảm biến lùi, gạt mưa tự động, đèn pha tự động, camera hành trình, hệ thống giải trí AV cùng nhiều tiện nghi khác..."></textarea>


                </div>
            </div>

            <div class="flex flex-col space-y-1">
                <div class="font-semibold text-xl">
                    Tính năng
                </div>

                <div>
                    <div class="grid grid-cols-3 gap-2 mt-3">
                        <div v-for="(feature, index) in features" :key="index">
                            <div class="text-base font-normal">
                                <input class="rounded" id="checkbox" type="checkbox" :value="feature"
                                    v-model="checkedFeatures" @change="handleCheckedFeatures" required />

                                <label for="checkbox" class="ml-1">
                                    {{ feature }}
                                </label>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="border-top border-gray-200 mt-2 w-full h-16  z-40 left-0 bottom-0 py-auto">
                <div class="flex gap-2 mt-3 h-10 absolute right-5">
                    <button class=" ml-auto px-auto border w-24 rounded-lg bg-gray-400 hover:bg-gray-700 "
                        @click="this.$emit('logout')">
                        Hủy
                    </button>
                    <button class=" ml-auto px-auto border w-24 rounded-lg bg-green-500 hover:bg-green-700"
                        @click="handleBtnConfirmUpdateCarInfo">
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal'
import { ref, onMounted } from 'vue';
import Slider from '@vueform/slider'
import InputAutoCompletePlace from '../../InputAutoCompletePlace.vue';
import gongAPI from "../../../../apis/goongMapAPI/api"
import { useStore } from 'vuex';
import { RepositoryFactory } from "../../../../apis/repositoryFactory";

import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification()

const carsRepo = RepositoryFactory.get('cars')
const props = defineProps({
    car: Object
})

const emit = defineEmits(['handleBtnConfirmUpdateCarInfo'])

const carStore = useStore()
const features = carStore.getters.getFeatures
const checkedFeatures = ref(props.car.features)
const price = ref(props.car.price)
const carLocation = ref(props.car.location)
const discountValue = ref(props.car.discount)
const deliverDistanceValue = ref(props.car.max_distance_delivery)
const deliverPriceValue = ref(props.car.delivery_price_1km)
const freeDeliverDistanceValue = ref(props.car.max_delivery_free_price)
const maxKmPerDayValue = ref(props.car.max_distance_per_day)
const overLimitFee = ref(props.car.over_distance_per_km_price)
const showCarDelivery = ref(props.car.car_delivery)
const showMaxCarDelivery = ref(props.car.max_km_per_day)
const description = ref(props.car.description)


const handleSelectedLocation = async (data) => {
    carLocation.value = data
    const place = await gongAPI.getPlaceDetailById(data.place_id)
    const geometry = place.result.geometry.location
    console.log({ geometry })
    carLocation.value = { ...carLocation.value, geometry }
}


function convertObjToFormData(obj) {
    const formData = new FormData()
    for (var key in obj) {
        if (key === 'images') {
            for (let i = 0; i < obj.images.length; i++) {
                formData.append(key, obj.images[i]);
            }
        } else {
            formData.append(key, obj[key]);
        }

    }
    return formData
}

function handleBtnConfirmUpdateCarInfo() {
    const payload = {
        features: checkedFeatures.value,
        price: price.value,
        location: JSON.stringify(carLocation.value),
        discount: discountValue.value,
        description: description.value,
        car_delivery: showCarDelivery.value,
        max_km_per_day: showMaxCarDelivery.value,
        max_distance_delivery: deliverDistanceValue.value,
        delivery_price_1km: deliverPriceValue.value,
        max_delivery_free_price: freeDeliverDistanceValue.value,
        max_distance_per_day: maxKmPerDayValue.value,
        over_distance_per_km_price: overLimitFee.value
    }

    carsRepo.updatedCar(props.car._id, payload).then((result) => {
        console.log({ result })
        notify({
            title: 'Thông báo',
            text: 'Thay đổi thông tin xe thành công.',
            type: 'success'
        });
        emit('handleBtnConfirmUpdateCarInfo')
    }).catch((err) => {
        notify({
            title: 'Error',
            text: err.response.data.message,
            type: 'error'
        });
    })
}

onMounted(() => {
    console.log(props.car)
    console.log(carLocation.value.description)
})

</script>

<style lang="scss" scoped></style>