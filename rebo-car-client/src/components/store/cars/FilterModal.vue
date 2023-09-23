<template>
    <VueFinalModal class="flex justify-center items-center absolute m-auto inset-0 text-center "
        content-class="flex w-665 h-620 flex-col max-w-xl  bg-gray-100 text-black rounded-lg space-y-2 overflow-y-auto ">

        <div class="relative">
            <div
                class="font-sans font-semibold text-black text-center sticky top-0 z-40 bg-gray-50 h-7 text-2xl w-full border-bottom ">
                Bộ lọc nâng cao

            </div>
            <div class="mx-4 p-4">
                <div class="text-black font-semibold text-xl space-y-4">

                    <div class="text-left mt-2">
                        Sắp xếp

                        <select
                            class="bg-gray-50 mt-3 border border-gray-6500 font-sans text-lg text-gray-900  rounded-lg block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-black dark:focus:border-black">
                            <option selected>Tối ưu</option>
                            <option value="near">Khoảng cách gần nhất</option>
                            <option value="lowestPrice">Giá thấp nhất</option>
                            <option value="highestPrice">Giá cao nhất</option>
                            <option value="bestReview">Đánh giá tốt nhất</option>
                            <option value="bestDiscount">Xe Giảm Giá</option>
                        </select>

                    </div>

                    <div class="text-left ">
                        Loại xe

                        <select
                            class="bg-gray-50 mt-3 border border-gray-6500 font-sans text-lg text-gray-900  rounded-lg block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-black dark:focus:border-black">
                            <option selected>Tất cả</option>
                            <option value="mini">4 chỗ (Mini)</option>
                            <option value="sedan">4 chỗ (Sedan)</option>
                        </select>

                    </div>

                    <div class="text-left ">
                        Hãng xe

                        <select
                            class="bg-gray-50 mt-3 border border-gray-6500 font-sans text-lg text-gray-900  rounded-lg block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-black dark:focus:border-black">
                            <option selected>Tất cả</option>
                            <option value="bmw">BMW</option>
                            <option value="chevrolet">Chevrolet</option>
                        </select>

                    </div>

                    <div class="text-left">
                        Mức giá
                        <div class="mt-9 w-11/12 mx-auto">
                            <Slider v-model="priceRangeValue" :min="200" :max="5000" :step="100"
                                :format="(value) => `${Math.round(value)}K`"
                                @change="(e) => console.log('priceRangeValue', e)" />
                        </div>

                    </div>

                    <div class="text-left">
                        Số ghế
                        <div class="mt-9 w-11/12 mx-auto">
                            <Slider v-model="seatRangeValue" :min="2" :max="10" :step="1"
                                @change="(e) => console.log('priceRangeValue', e)" />
                        </div>

                    </div>

                    <div class="text-left">
                        Năm sản xuất
                        <div class="mt-9 w-11/12 mx-auto">
                            <Slider v-model="yearRangeValue" :min="2005" :max="2023" :step="1"
                                @change="(e) => console.log('priceRangeValue', e)" />
                        </div>

                    </div>

                    <div class="text-left">
                        Mức tiêu thụ nhiên liệu
                        <div class="mt-9 w-11/12 mx-auto">
                            <Slider v-model="oilConsumedValue" :min="0" :max="30" :step="5" :tooltips="true"
                                @change="(e) => console.log('priceRangeValue', e)" />

                            <div v-if="oilConsumedValue == 0"
                                class="border-2 border-gray-300 rounded-lg mt-3 w-2/6 text-center font-normal text-base">
                                Bất kì
                            </div>
                            <div v-else
                                class="border-2 border-gray-300 rounded-lg mt-3 w-2/6 text-center font-normal text-base">
                                Từ dưới {{ oilConsumedValue }}L/Km
                            </div>
                        </div>

                    </div>

                    <div class="text-left">
                        Tính năng

                        <div class="grid grid-cols-3 gap-2 mt-3">
                            <div v-for="feature in features" :key="feature">
                                <div class="text-base font-normal flex">
                                    <input class="rounded" type="checkbox" id="checkbox" v-model="checked" />

                                    <label for="checkbox" class="ml-1 my-auto">
                                        {{ feature }}
                                    </label>

                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="text-left">
                        Nhiên liệu

                        <div class="grid grid-cols-4 gap-2 mt-3">
                            <div v-for="fuel in fuels" :key="fuel">
                                <div class="text-base font-normal flex">
                                    <input class="rounded" type="checkbox" id="checkbox" v-model="checked" />

                                    <label for="checkbox" class="ml-1 my-auto">
                                        {{ fuel }}
                                    </label>

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>


            <div class="border-top mt-2 w-full h-16 bg-gray-50  shadow-inner">
                <div class="absolute flex gap-2 right-5 h-10 p-1">
                    <button class="mt-1 ml-auto px-2 border rounded-lg bg-gray-400 hover:bg-gray-700"
                        @click="this.$emit('confirm')">
                        Xóa bộ lọc
                    </button>
                    <button class="mt-1 ml-auto px-2 border rounded-lg bg-green-500 hover:bg-green-700"
                        @click="this.$emit('confirm')">
                        Áp dụng
                    </button>
                </div>

            </div>


        </div>



    </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal'
import Slider from '@vueform/slider'
import { useStore } from 'vuex'
import { ref, onUpdated } from 'vue'

const store = useStore()
const homeStore = store.state.homeStore

const priceRangeValue = ref([200, 5000])
const seatRangeValue = ref([2, 10])
const yearRangeValue = ref([2005, 2023])
const oilConsumedValue = ref(30)
const features = homeStore.features
const fuels = homeStore.fuels
onUpdated(() => {
    console.log('updated')
})
</script>

<style lang="css" scoped>
.border-bottom {
    padding-bottom: 55px;
    border-bottom: 1px solid gray;
}

.border-top {
    border-top: 1px solid gray;
}
</style>

<style src="@vueform/slider/themes/default.css"></style>