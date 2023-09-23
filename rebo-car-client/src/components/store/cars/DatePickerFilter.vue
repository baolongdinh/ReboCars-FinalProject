<template>
    <div>
        <div class="shadow-lg bg-white rounded-3xl mx-16 ">
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

                <div class="mt-6">
                    <button
                        class=" border-2 flex border-black bg-gray-50 hover:bg-gray-400  py-2 mt-1 font-bold px-4 h-10 w-28 rounded-xl"
                        @click="handleClickFindingCars()">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1.25em"
                            viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                            <path
                                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                        </svg>

                        <div class=" font-sans text-black ml-1 font-bold">
                            Tìm xe
                        </div>
                    </button>

                    <button
                        class=" border-2 flex border-black  bg-gray-50 hover:bg-gray-400 py-2 mt-1  px-4 h-10 w-28 rounded-xl"
                        @click="show = true">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1.25em"
                            viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                            <path
                                d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
                        </svg>
                        <div class=" font-sans text-black ml-1 font-bold">
                            Bộ lọc
                        </div>

                        <div>

                            <div class="opacity-80 bg-gray-800 fixed z-30 inset-0 w-full h-full " v-if="show">
                                <!-- OVERLAY SCREEN WHEN POP UP DIALOG MODAL -->

                                <filter-modal v-model="show" @confirm="() => confirm()">

                                </filter-modal>
                            </div>
                        </div>


                    </button>



                </div>

            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import InputAutoCompletePlace from '../InputAutoCompletePlace.vue'
import FilterModal from "./FilterModal.vue"
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

const show = ref(false)

function confirm() {
    show.value = false
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