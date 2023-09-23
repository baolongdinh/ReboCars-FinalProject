<template>
    <div>
        <div class="shadow-2xl bg-white rounded-3xl mx-16 mt-3">
            <div class="demo-datetime-picker mx-14 ">
                <div class="block">
                    <span class="demonstration ">Địa chỉ tìm kiếm xe</span>
                    <input-auto-complete-place @selectedValue="handleEmit_setSelectedLocation" />
                </div>

                <div class="block">
                    <span class="demonstration ">Ngày bắt đầu</span>
                    <el-date-picker v-model="startDate" type="datetime" placeholder="Select date and time"
                        :default-time="defaultTime" :value="value" />
                </div>

                <div class="block">
                    <span class="demonstration">Ngày kết thúc</span>
                    <el-date-picker v-model="endDate" type="datetime" placeholder="Select date and time"
                        :default-time="defaultTime" />
                </div>


                <button
                    class=" bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 ml-12 px-4 mt-12 h-12 w-32 rounded-xl"
                    @click="handleClickFindingCars()">
                    Tìm xe
                </button>

            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import InputAutoCompletePlace from './InputAutoCompletePlace.vue'
import { useRouter, useRoute } from 'vue-router'
const startDate = ref('')
const endDate = ref('')
const locationSelected = ref('')

const router = useRouter()
const value = new Date(2000, 2, 12, 12, 0, 0)
const defaultTime = new Date(2000, 1, 1, 12, 0, 0)


const handleEmit_setSelectedLocation = (data) => {
    locationSelected.value = data
    console.log('data emit recept', data)
}

function handleClickFindingCars() {
    console.log(`start date : ${startDate.value} -- end date: ${endDate.value}`)
    console.log('data: ', locationSelected.value)
    router.push({ path: '/cars', query: { startDate: startDate.value, endDate: endDate.value, location: locationSelected.value } })
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
    text-align: center;
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