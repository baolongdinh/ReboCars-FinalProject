<template>
    <div class="relative">
        <div class="font-bold font-sans text-3xl flex-col">
            <div>
                Danh sách xe
            </div>

            <div class="flex-col space-y-5 pt-4">
                <div v-for="userCar in userCars" :key="userCar._id">
                    <MyCarCard :userCar="userCar" v-if="userCar"></MyCarCard>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import MyCarCard from './MyCarCard.vue';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { RepositoryFactory } from "../../../../apis/repositoryFactory";
const carsRepo = RepositoryFactory.get("cars");

//define
const store = useStore()
const userCars = ref([])
const user_id = store.state.authStore.user._id

async function loadListUserCars(user_id) {
    const filter = JSON.stringify({ user_id: user_id })
    const result = await carsRepo.getCars({ filter })
    userCars.value = result.data.metadata.cars
    console.log(userCars.value)
}

onMounted(() => {
    loadListUserCars(user_id)
})


</script>

<style lang="scss" scoped></style>