<template>
    <div>
        <div class="shadow-2xl bg-white rounded-3xl border border-gray-300 mx-16 mt-3">
            <div class="demo-datetime-picker mx-14 ">
                <div class="block ">
                    <div>
                        <span class="demonstration">
                            <font-awesome-icon :icon="['fas', 'location-dot']" size="lg" />
                            <label class="ml-3">
                                Địa chỉ tìm kiếm xe
                            </label>
                        </span>
                    </div>

                    <div>
                        <input-auto-complete-place @selectedValue="handleSelectedLocation" />
                    </div>

                </div>

                <div class="block gap-x-3 mx-14">
                    <span class="demonstration ">
                        <font-awesome-icon :icon="['fas', 'calendar']" />
                        <label class="ml-3">
                            Ngày bắt đầu - Ngày kết thúc
                        </label>

                    </span>
                    <VueDatePicker v-model="dateRange" range :partial-range="false" />
                </div>

                <button class=" bg-blue-500 hover:bg-blue-700  text-white font-bold py-2  px-4 mt-12 h-12 w-32 rounded-xl"
                    @click="handleClickFindingCars()">
                    Tìm xe
                </button>

            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import InputAutoCompletePlace from './InputAutoCompletePlace.vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex';

const store = useStore()

const locationSelected = ref('')


const dateRange = ref();

onMounted(() => {
    const startDate = new Date();
    const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
    dateRange.value = [startDate, endDate];
})

const router = useRouter()



const handleSelectedLocation = (data) => {
    locationSelected.value = data.description
    store.commit("setLocation", data)

    const filters = store.getters.getFilters

    filters.location = data
    store.commit("setFilters", filters)

    console.log('data emit recept', data)
}

function handleClickFindingCars() {
    console.log(dateRange.value)
    store.commit("setStartDateTime", dateRange.value[0])
    store.commit("setEndDateTime", dateRange.value[1])

    const filters = store.getters.getFilters
    filters.startDateTime = dateRange.value[0]
    filters.endDateTime = dateRange.value[1]


    router.push({ path: '/find/filter/cars' })
}


</script>
<style scoped>
.demo-datetime-picker {
    display: flex;
    width: 100%;
    padding: 0;
    flex-wrap: wrap;
}

.demo-datetime-picker .block {

    padding: 30px 0;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
}

.demo-datetime-picker .block:last-child {
    border-right: none;
}

.demo-datetime-picker .demonstration {
    display: block;
    color: black;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
}
</style>
  
  components: { InputAutoCompletePlace },