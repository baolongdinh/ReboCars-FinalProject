<template>
    <VueFinalModal class="justify-center items-center text-center absolute "
        content-class="flex flex-col bg-gray-100 text-black rounded-lg space-y-2  ">

        <div class="relative">
            <div
                class="font-sans font-semibold text-black text-center sticky top-0 z-40 bg-gray-50 h-16 text-2xl w-full border-bottom ">
                Bộ lọc nâng cao

            </div>
            <div class="mx-4 p-4">
                <div class="text-black font-semibold text-xl space-y-4">

                    <div class="text-left mt-2">
                        Sắp xếp

                        <select
                            class="bg-gray-50 mt-3 border border-gray-6500 font-sans text-lg text-gray-900  rounded-lg block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-black dark:focus:border-black"
                            @change="handleSortSelected" v-model="sortSelected">
                            <option value="">Tối ưu</option>
                            <option v-for="(sortOption, index) in sortOptions" :value="sortOption" :key="index">
                                {{ sortOption }}
                            </option>
                        </select>

                    </div>

                    <div class="text-left ">
                        Loại xe

                        <select
                            class="bg-gray-50 mt-3 border border-gray-6500 font-sans text-lg text-gray-900  rounded-lg block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-black dark:focus:border-black"
                            @change="handleTypeOfCarSelected" v-model="typeOfCarSelected">
                            <option value="">Tất cả</option>

                            <option v-for="(typeOfCar, index) in typeOfCars" :value="typeOfCar" :key="index">
                                {{ typeOfCar }}
                            </option>

                        </select>

                    </div>

                    <div class="text-left ">
                        Hãng xe

                        <select
                            class="bg-gray-50 mt-3 border border-gray-6500 font-sans text-lg text-gray-900  rounded-lg block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-black dark:focus:border-black"
                            @change="handleAutoMakerSelected" v-model="autoMakerSelected">
                            <option value="">Tất cả</option>
                            <option v-for="(autoMaker, index) in autoMakers" :value="autoMaker" :key="index">
                                {{ autoMaker }}
                            </option>
                        </select>

                    </div>

                    <div class="text-left">
                        Mức giá
                        <div class="mt-9 w-11/12 mx-auto">
                            <Slider v-model="priceRangeValue" :min="200" :max="5000" :step="100"
                                :format="(value) => `${Math.round(value)}K`" @change="handleUpdatePriceRangeChanged" />
                        </div>

                    </div>

                    <div class="text-left">
                        Số ghế
                        <div class="mt-9 w-11/12 mx-auto">
                            <Slider v-model="seatRangeValue" :min="2" :max="10" :step="1"
                                @change="handleUpdateSeatsRangeChanged" />
                        </div>

                    </div>

                    <div class="text-left">
                        Năm sản xuất
                        <div class="mt-9 w-11/12 mx-auto">
                            <Slider v-model="yearRangeValue" :min="2005" :max="2023" :step="1"
                                @change="handleUpdateYearRangeChanged" />
                        </div>
                    </div>

                    <div class="text-left">
                        Mức tiêu thụ nhiên liệu
                        <div class="mt-9 w-11/12 mx-auto">
                            <Slider v-model="oilConsumedValue" :min="0" :max="100" :step="5" :tooltips="true"
                                @change="handleUpdateSFCChanged" />

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
                            <div v-for="(feature, index) in features" :key="index">
                                <div class="text-base font-normal flex">
                                    <input class="rounded" type="checkbox" :value="feature" v-model="checkedFeatures"
                                        @change="handleCheckedFeatures" />
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
                                    <input class="rounded" type="radio" :value="fuel" v-model="checkedFuels"
                                        @change="handleCheckedFuels" />

                                    <label for="fuel" class="ml-1 my-auto">
                                        {{ fuel }}
                                    </label>

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>


            <div class="border-top border-gray-200 mt-2 w-full h-16 bg-white shadow-md sticky z-40 left-0 bottom-0 py-auto">
                <div class="flex gap-2 mt-3 h-10 absolute right-5">
                    <button class=" ml-auto px-auto border w-24 rounded-lg bg-gray-400 hover:bg-gray-700 "
                        @click="handleDeleteFilterState">
                        Xóa bộ lọc
                    </button>
                    <button class=" ml-auto px-auto border w-24 rounded-lg bg-green-500 hover:bg-green-700"
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
import { ref, onUpdated, onBeforeUnmount, computed } from 'vue'

const carStore = useStore()
const filterState = carStore.getters.getFilterState

var priceRangeValue = filterState.priceRangeValue || [200, 5000]
var seatRangeValue = filterState.seatRangeValue || [2, 10]
var yearRangeValue = filterState.yearRangeValue || [2005, 2023]
var oilConsumedValue = filterState.oilConsumedValue || 100

console.log({ filterState })

const features = carStore.getters.getFeatures

const fuels = carStore.getters.getFuels

const sortOptions = carStore.getters.getSortOptions
const typeOfCars = carStore.getters.getListTypeOfCars
const autoMakers = carStore.getters.getAutoMakers


var checkedFeatures = filterState?.checkedFeatures ? ref(filterState.checkedFeatures) : ref([])
var checkedFuels = ref(filterState?.checkedFuels) || ref("")

var sortSelected = filterState.sortSelected || ""
var typeOfCarSelected = filterState.typeOfCarSelected || ""
var autoMakerSelected = filterState.autoMakerSelected || ""

const filter = {}

function setFilterState() {
    filter.priceRange = {
        min: priceRangeValue[0],
        max: priceRangeValue[1],
    }

    filter.seatsRange = {
        min: seatRangeValue[0],
        max: seatRangeValue[1],
    }

    filter.manufactureYearRange = {
        min: yearRangeValue[0],
        max: yearRangeValue[1],
    }

    filter.sfc_100km = oilConsumedValue

    filter.features = checkedFeatures.value

    filter.fuel = checkedFuels.value

    filter.typeOfCar = typeOfCarSelected

    filter.autoMaker = autoMakerSelected

    carStore.dispatch("matchSortSelected", sortSelected).then(sort => {
        filter.sort = sort
    })

}

setFilterState()

console.log({ filter })

const emit = defineEmits(['handleUpdateFilterChanged', 'handleDeleteFilterState'])

function handleUpdatePriceRangeChanged(priceRange) {
    priceRangeValue = priceRange
    filter.priceRange = {
        min: priceRange[0],
        max: priceRange[1],
    }
    emit('handleUpdateFilterChanged', filter)
}

function handleUpdateSeatsRangeChanged(seatsRange) {
    seatRangeValue = seatsRange
    filter.seatsRange = {
        min: seatsRange[0],
        max: seatsRange[1],
    }
    emit('handleUpdateFilterChanged', filter)
}

function handleUpdateYearRangeChanged(yearsRange) {
    yearRangeValue = yearsRange
    filter.manufactureYearRange = {
        min: yearsRange[0],
        max: yearsRange[1],
    }
    emit('handleUpdateFilterChanged', filter)
}

function handleUpdateSFCChanged(sfc_100km) {
    oilConsumedValue = sfc_100km
    filter.sfc_100km = sfc_100km
    emit('handleUpdateFilterChanged', filter)
}

function handleCheckedFeatures() {
    filter.features = checkedFeatures.value
    emit('handleUpdateFilterChanged', filter)

}

function handleCheckedFuels() {
    filter.fuel = checkedFuels.value
    emit('handleUpdateFilterChanged', filter)
}

async function handleSortSelected(event) {
    const sort = await carStore.dispatch("matchSortSelected", event.target.value)
    filter.sort = sort
    emit('handleUpdateFilterChanged', filter)
}

function handleTypeOfCarSelected(event) {
    filter.typeOfCar = event.target.value
    emit('handleUpdateFilterChanged', filter)
}

function handleAutoMakerSelected(event) {
    filter.autoMaker = event.target.value
    emit('handleUpdateFilterChanged', filter)
}


function handleDeleteFilterState() {
    carStore.commit('setFilterState', {})
    emit('handleDeleteFilterState')
}

onUpdated(async () => {

})

onBeforeUnmount(() => {

    console.log("2", { checkedFeatures })

    const filterState = {
        priceRangeValue,
        seatRangeValue,
        yearRangeValue,
        oilConsumedValue,
        sortSelected,
        typeOfCarSelected,
        autoMakerSelected,
        checkedFeatures,
        checkedFuels
    }

    carStore.commit('setFilterState', filterState)
    console.log(filterState)
    console.log('unmounted')
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