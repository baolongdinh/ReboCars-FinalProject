<template>
    <div class="bg-gray-100">
        <div class="sticky top-0 z-50">
            <date-picker-filter @handleUpdateLocation="handleUpdateLocation" @handleUpdateDateRange="handleUpdateDateRange"
                @handleUpdateFilterChanged="findCarsByFilter" @handleDeleteFilterState="handleDeleteFilterState">
            </date-picker-filter>
        </div>


        <div v-if="!cars.length > 0 && listCarLoaded">
            <div class=" w-335 mx-auto ">
                <img class=" w-full" loading="lazy" src="https://www.mioto.vn/static/media/empty-mycar.e023e681.svg" alt="">

                <div class=" w-fit mx-auto font-sans text-xl text-gray-600 "> Không tìm thấy xe nào </div>
            </div>
        </div>
        <!-- <list-cars /> -->
        <div v-else>
            <ListCars :listCars=cars @handleUserClickCarCard="handleUserClickCarCard" />
        </div>

    </div>
</template>

<script setup>
import ListCars from "./ListCars.vue"
import DatePickerFilter from '../cars/DatePickerFilter.vue';
import { computed, onMounted, onUpdated, watch, ref, onBeforeMount, onUnmounted, onActivated, onDeactivated } from 'vue';
import { useStore, mapGetters } from 'vuex'
import { useRouter } from "vue-router";
///// api call logic 

const carStore = useStore()
const router = useRouter()
var cars = ref([])
const startDateTime = carStore.getters.getStartDateTime
const endDateTime = carStore.getters.getEndDateTime
const location = carStore.getters.getLocation
const listCarLoaded = ref(false)
const filters = ref({
    startDateTime,
    endDateTime,
    location
})
const reloadStateFilters = ref({
    startDateTime,
    endDateTime,
    location
})

var page = 1
var limit = 12


async function updateListCars(page, limit, filterPayload) {
    cars.value = await carStore.dispatch('findCarsFilter', { page, limit, filterPayload })
    listCarLoaded.value = true
}


async function loadMoreListCars(page, limit, filterPayload) {
    console.log('loadMore', page)
    console.log({ filterPayload })
    const loadMoreListCars = await carStore.dispatch('findCarsFilter', { page, limit, filterPayload })
    cars.value = cars.value.concat(loadMoreListCars)
    console.log('loadMoreListCars', cars.value)
}

async function findCarsByFilter(AllFilterCondition) {

    const { features, fuel, sort, ...filter } = AllFilterCondition
    const startDateTimeValue = startDateTime.value
    const endDateTimeValue = endDateTime.value
    const locationValue = location.value
    const filterPayload = { startDateTime: startDateTimeValue, endDateTime: endDateTimeValue, location: locationValue, sort, filter, features, fuel, }
    filters.value = filterPayload
    carStore.commit("setFilters", filterPayload)
    page = 1  // set page eq 1 before filter
    updateListCars(page, limit, filterPayload).then(() => console.log('filter Cars', cars.value))


}

async function handleUpdateLocation(location) {
    const filterPayload = filters.value
    filters.value.location = location
    filterPayload.location = location
    page = 1  // set page eq 1 before filter
    updateListCars(page, limit, filterPayload)

}

async function handleUpdateDateRange(dateRange) {
    const filterPayload = filters.value
    filters.value.startDateTime = dateRange[0]
    filters.value.endDateTime = dateRange[1]
    filterPayload.startDateTime = dateRange[0]
    filterPayload.endDateTime = dateRange[1]
    page = 1  // set page eq 1 before filter
    updateListCars(page, limit, filterPayload)

}

// handle users click items
function handleUserClickCarCard(carId) {

    router.push({
        name: "car", params: { id: carId },
        query: {
            startDateTime: filters.value.startDateTime,
            endDateTime: filters.value.endDateTime,

        }
    })

}


async function handleDeleteFilterState() {
    const filterPayload = reloadStateFilters.value
    await updateListCars(page, limit, filterPayload)
}


//// handle user scroll

function increasePage() {
    page++
}

const handleUserScrollBottom = async (e) => {

    const clientHeight = e.target.documentElement.clientHeight
    const scrollHeight = e.target.documentElement.scrollHeight
    const scrollTop = e.target.documentElement.scrollTop

    if (scrollTop + clientHeight >= scrollHeight - 0.5) {

        console.log('bottom!')
        increasePage()
        await loadMoreListCars(page, limit, filters.value)
    }
}

function scrollToTop() {
    window.scrollTo(0, 0);
}

onMounted(async () => {
    console.log('mounted', startDateTime.value)
    window.addEventListener("scroll", handleUserScrollBottom)
    const filterPayload = filters.value
    console.log('mounted', page)
    await updateListCars(page, limit, filterPayload)

})


onUnmounted(() => {
    console.log('un mounted')
    window.removeEventListener("scroll", handleUserScrollBottom)
})


onUpdated(() => {
    console.log('update')
    console.log(filters.value)

})

</script>

<style lang="scss" scoped></style>