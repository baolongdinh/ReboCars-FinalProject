<template>
    <div class="bg-gray-100">
        <div class="sticky top-0 z-50">
            <date-picker-filter @handleUpdateLocation="handleUpdateLocation" @handleUpdateDateRange="handleUpdateDateRange"
                @handleUpdateFilterChanged="findCarsByFilter">
            </date-picker-filter>
        </div>
        <img :src="seatIcon" />
        <!-- <list-cars /> -->
        <ul @scroll="handleScroll">
            {{ cars }}
        </ul>

    </div>
</template>

<script setup>

import listCars from './ListCars.vue';
import seatIcon from "../../../assets/icons/seats.svg"
import { RepositoryFactory } from '../../../apis/repositoryFactory';
import DatePickerFilter from '../cars/DatePickerFilter.vue';
import { computed, onMounted, onUpdated, watch, ref, onBeforeMount } from 'vue';
import { useStore, mapGetters } from 'vuex'
const carsRepo = RepositoryFactory.get("cars");

const carStore = useStore()
var cars = ref([])

const startDateTime = carStore.getters.getStartDateTime
const endDateTime = carStore.getters.getEndDateTime
const location = carStore.getters.getLocation
const filters = ref({})
var page = 1
var limit = 12


async function updateListCars(page, limit, filterPayload) {
    cars.value = await carStore.dispatch('findCarsFilter', { page, limit, filterPayload })
}

async function findCarsByFilter(AllFilterCondition) {

    const { features, fuel, sort, ...filter } = AllFilterCondition

    const filterPayload = { startDateTime, endDateTime, location, sort, filter, features, fuel, }
    filters.value = filterPayload
    carStore.commit("setFilters", filterPayload)
    updateListCars(page, limit, filterPayload)

}

async function handleUpdateLocation(location) {
    const filterPayload = filters.value
    filterPayload.location = location
    updateListCars(page, limit, filterPayload)

}

async function handleUpdateDateRange(dateRange) {
    const filterPayload = filters.value
    filterPayload.startDateTime = dateRange[0]
    filterPayload.endDateTime = dateRange[1]
    updateListCars(page, limit, filterPayload)

}

function handleScroll(e) {
    const { scrollTop, offsetHeight, scrollHeight } = e.target
    if ((scrollTop + offsetHeight) >= scrollHeight) {
        console.log('bottom!')
    }
}

onMounted(async () => {
    const filterPayload = carStore.getters.getFilters
    console.log('mounted', filterPayload)
    updateListCars(page, limit, filterPayload)
})

onUpdated(() => {
    console.log('update')

})

</script>

<style lang="scss" scoped></style>