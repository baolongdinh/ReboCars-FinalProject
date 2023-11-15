<template>
    <div>
        <div class="shadow-lg bg-white rounded-3xl border border-gray-300 mx-16 ">
            <div class="demo-datetime-picker ">
                <div class="block mx-8">
                    <div>
                        <span class="demonstration">
                            <font-awesome-icon :icon="['fas', 'location-dot']" size="lg" />
                            <label class="ml-3">
                                Địa chỉ tìm kiếm xe
                            </label>
                        </span>
                    </div>

                    <div>
                        <input-auto-complete-place :searchValue="location" @selectedValue="handleSelectedLocation" />
                    </div>

                </div>

                <div class="block gap-x-3">
                    <span class="demonstration ">
                        <font-awesome-icon :icon="['fas', 'calendar']" />
                        <label class="ml-3">
                            Ngày bắt đầu - Ngày kết thúc
                        </label>

                    </span>
                    <VueDatePicker v-model="dateRange" range :min-date="new Date()"
                        @update:model-value="handleSubmitUpdateDateRange" :partial-range="false" />
                </div>

                <div class="mt-6">


                    <button
                        class=" border-2 flex border-black  bg-gray-50 hover:bg-gray-400 py-2 mt-12  px-4 h-10 w-28 rounded-xl"
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

                            <div class="opacity-80 bg-gray-800 fixed z-40 inset-0 " v-if="show">
                                <!-- OVERLAY SCREEN WHEN POP UP DIALOG MODAL -->

                                <KeepAlive>
                                    <FilterModal class="overflow-y-auto h-650 w-580 absolute m-auto inset-0 " v-model="show"
                                        :key="keyReload" @handleUpdateFilterChanged="handleUpdateFilterChanged"
                                        @handleDeleteFilterState="handleDeleteFilterState" @confirm="() => confirm()">
                                    </FilterModal>
                                </KeepAlive>

                            </div>
                        </div>

                    </button>
                </div>

            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, defineProps, onMounted } from 'vue'
import InputAutoCompletePlace from '../InputAutoCompletePlace.vue'
import FilterModal from "./FilterModal.vue"
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

const emit = defineEmits(['handleUpdateFilterChanged', 'handleUpdateLocation', 'handleUpdateDateRange', 'handleDeleteFilterState'])

const store = useStore()
const router = useRouter()
const dateRange = ref();
const keyReload = ref(0)

const location = ref(store.getters.getLocation.description ? store.getters.getLocation.description : "Hồ Chí Minh")
const startDateTime = store.getters.getStartDateTime
const endDateTime = store.getters.getEndDateTime

dateRange.value = [startDateTime, endDateTime]




function handleSubmitUpdateDateRange() {
    store.commit("setStartDateTime", dateRange.value[0])
    store.commit("setEndDateTime", dateRange.value[1])
    emit('handleUpdateDateRange', dateRange.value)
}

function handleUpdateFilterChanged(filter) {
    emit('handleUpdateFilterChanged', filter)
}

const handleSelectedLocation = (data) => {
    store.commit("setLocation", data)
    emit('handleUpdateLocation', data)
}

function handleDeleteFilterState() {
    keyReload.value = keyReload.value + 1  // update key to reload filter state
    emit('handleDeleteFilterState')

}

onMounted(() => {

    console.log('datePickerFilter', location, store.getters.getLocation.description)
})

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