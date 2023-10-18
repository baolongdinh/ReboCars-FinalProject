<template>
    <div class="p-12 font-sans flex flex-col space-y-4">
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
                <input id="price" type="text" class="w-305 h-11 rounded-lg border-gray-300 focus:border-blue-500">
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
                <input id="price" type="text" class="w-full h-11 rounded-lg border-gray-300 focus:border-blue-500"
                    placeholder="Địa chỉ mặc định để giao nhận xe">
            </div>
        </div>

        <div class="flex flex-col space-y-1 pt-3">
            <div class="flex justify-between">
                <div class="font-semibold text-xl">
                    Giao xe tận nơi
                </div>
                <div>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" class="sr-only peer">
                        <div
                            class="w-12 h-6 rounded-md bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500">
                        </div>
                    </label>
                </div>

            </div>

            <div class="mt-3 grid grid-cols-2 gap-6">
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
                        <input type="checkbox" value="" class="sr-only peer">
                        <div
                            class="w-12 h-6 rounded-md bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500">
                        </div>
                    </label>
                </div>

            </div>

            <div class="mt-3 grid grid-cols-2 gap-6">
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
                        <Slider v-model="overLimitFree" :min="1" :max="5" :step="1" :showTooltip="focus"
                            :format="DeliveryPriceSliderFormat" :tooltipPosition="bottom" />
                    </div>

                    <div class="font-semibold text-gray-400 text-sm pt-2">
                        Phí đề xuất 3k
                    </div>
                </div>

            </div>

        </div>



    </div>
</template>

<script setup>
import { onMounted, defineEmits, ref } from 'vue';
import { useStore } from 'vuex';
import Slider from '@vueform/slider'

const carStore = useStore()
const emit = defineEmits(['can-continue'])

const features = carStore.getters.getFeatures

const discountValue = ref(0)
const deliverDistanceValue = ref(5)
const deliverPriceValue = ref(1)
const freeDeliverDistanceValue = ref(0)
const maxKmPerDayValue = ref(300)
const overLimitFree = ref(1)

function discountSliderFormat(value) {
    return `${Math.round(value)}%`
}

function DeliveryDistanceSliderFormat(value) {
    return `${Math.round(value)}km`
}

function DeliveryPriceSliderFormat(value) {
    return `${Math.round(value)}K`
}

function FreeDeliveryDistanceSliderFormat(value) {
    return `${Math.round(value)}km`
}
onMounted(() => {
    emit('can-continue', { value: true })
})

</script>

<style src="@vueform/slider/themes/default.css"></style>