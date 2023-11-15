<template>
    <div class="relative">
        <div class="font-bold font-sans text-3xl flex-col">
            <div>
                Danh sách xe
            </div>

            <div class="flex-col space-y-5 pt-4">
                <div v-for="userCar in userCars" :key="userCar._id">
                    <MyCarCard :userCar="userCar" v-if="userCar" @handleClickCarInfo="handleClickCarInfo"></MyCarCard>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import CarInfoDetailVue from './CarInfoDetail.vue';
import MyCarCard from './MyCarCard.vue';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { RepositoryFactory } from "../../../../apis/repositoryFactory";
const carsRepo = RepositoryFactory.get("cars");

//define
const router = useRouter()
const store = useStore()
const userCars = ref([])
const user_id = store.state.authStore.user._id

const filter = JSON.stringify({ user_id: user_id })
var limit = 6
var page = 1


const showCarInfoDetailModal = ref(false)

function hiddenCarInfoDetailDialog() {
    showCarInfoDetailModal.value = false
}

function handleClickCarInfo(car) {
    router.push({ name: "MyCar", params: { id: car._id } })
}

async function loadListUserCars() {
    const result = await carsRepo.getCars({ page, limit, filter })
    userCars.value = result.data.metadata.cars
    console.log(userCars.value)
}

async function loadMoreCars() {
    page = page + 1
    const result = await carsRepo.getCars({ limit, page, filter })
    const moreCars = result.data.metadata.cars
    userCars.value = userCars.value.concat(moreCars)
}

const handleUserScrollBottom = async (e) => {

    const clientHeight = e.target.documentElement.clientHeight
    const scrollHeight = e.target.documentElement.scrollHeight
    const scrollTop = e.target.documentElement.scrollTop

    if (scrollTop + clientHeight >= scrollHeight) {
        console.log('bottom!')
        await loadMoreCars()
        console.log(userCars.value)
    }
}


onMounted(() => {
    window.addEventListener("scroll", handleUserScrollBottom)
    loadListUserCars()
})


</script>

<style lang="scss" scoped></style>