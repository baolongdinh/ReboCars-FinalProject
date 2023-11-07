<template>
    <div class="p-12 font-sans flex flex-col space-y-4">
        <div class="flex flex-col space-y-1">
            <div class="font-semibold text-xl">
                Tên xe
            </div>
            <div class="font-normal text-red-500 text-sm ">
                Lưu ý: Tên xe sẽ không thể thay đổi sau khi đăng kí
            </div>

            <div>
                <input type="text" class="w-305 h-11 rounded-lg border-gray-300 focus:border-blue-500" v-model="name"
                    required>
            </div>
        </div>

        <div class="flex flex-col space-y-1">
            <div class="font-semibold text-xl">
                Biển số xe
            </div>
            <div class="font-normal text-red-500 text-sm">
                Lưu ý: Biển số xe sẽ không thể thay đổi sau khi đăng kí
            </div>

            <div>
                <input type="text" class="w-305 h-11 rounded-lg border-gray-300 focus:border-blue-500"
                    v-model="identifyNumber" required>
            </div>
        </div>

        <div class="flex flex-col space-y-1">
            <div class="font-semibold text-xl">
                Thông tin cơ bản
            </div>
            <div class="font-normal text-red-500 text-sm">
                Lưu ý: Các thông tin cơ bản sẽ không thể thay đổi sau khi đăng kí
            </div>

            <div class="grid grid-cols-2 gap-3 pt-4">
                <div>
                    <div class="font-normal text-gray-600 text-base pb-2">Hãng xe</div>

                    <select class="w-305 h-11 rounded-lg border-gray-300" v-model="autoMakersSelected">
                        <option disabled selected value="">Chọn hãng xe</option>
                        <option v-for="(autoMaker, index) in autoMakers" :value="autoMaker" :key="index">
                            {{ autoMaker }}
                        </option>
                    </select>
                </div>

                <div>
                    <div class="font-normal text-gray-600 text-base pb-2">Loại xe</div>

                    <select class="w-305 h-11 rounded-lg border-gray-300" v-model="typeOfCarsSelected">
                        <option disabled selected value="">Chọn loại xe</option>
                        <option v-for="(typeOfCar, index) in typeOfCars" :value="typeOfCar" :key="index">
                            {{ typeOfCar }}
                        </option>
                    </select>
                </div>

                <div>
                    <div class="font-normal text-gray-600 text-base pb-2">Số ghế</div>

                    <select class="w-305 h-11 rounded-lg border-gray-300" v-model="seatRangeSelected">
                        <option disabled selected value="">Chọn số ghế </option>
                        <option v-for="(seats, index) in seatRange" :value="seats" :key="index">
                            {{ seats }}
                        </option>
                    </select>
                </div>

                <div>
                    <div class="font-normal text-gray-600 text-base pb-2">Năm sản suất</div>

                    <select class="w-305 h-11 rounded-lg border-gray-300" v-model="yearRangeSelected">
                        <option disabled selected value="">Chọn năm sản xuất</option>
                        <option v-for="(year, index) in yearRange" :value="year" :key="index">
                            {{ year }}
                        </option>
                    </select>
                </div>

                <div>
                    <div class="font-normal text-gray-600 text-base pb-2">Truyền động</div>

                    <select class="w-305 h-11 rounded-lg border-gray-300" v-model="transmissionsSelected">
                        <option disabled selected value="">Chọn loại truyền động</option>
                        <option v-for="(transmission, index) in transmissions" :value="transmission" :key="index">
                            {{ transmission }}
                        </option>
                    </select>
                </div>

                <div>
                    <div class="font-normal text-gray-600 text-base pb-2">Loại nhiên liệu</div>

                    <select class="w-305 h-11 rounded-lg border-gray-300" v-model="fuelSelected">
                        <option disabled selected value="">Chọn loại nhiên liệu</option>
                        <option v-for="(fuel, index) in fuels" :value="fuel" :key="index">
                            {{ fuel }}
                        </option>
                    </select>
                </div>

            </div>
        </div>

        <div class="flex flex-col space-y-1">
            <div class="font-semibold text-xl">
                Mức tiêu thụ nhiên liệu
            </div>
            <div class="font-normal text-gray-500 text-sm">
                Số lít nhiên liệu cho quãng đường 100km
            </div>

            <div>
                <input type="text" class="w-305 h-11 rounded-lg border-gray-300 focus:border-blue-500" v-model="sfc_100km"
                    required>
            </div>
        </div>

        <div class="flex flex-col space-y-1">
            <div class="font-semibold text-xl">
                Tính năng
            </div>

            <div>
                <div class="grid grid-cols-3 gap-2 mt-3">
                    <div v-for="(feature, index) in features" :key="index">
                        <div class="text-base font-normal">
                            <input class="rounded" id="checkbox" type="checkbox" :value="feature" v-model="checkedFeatures"
                                @change="handleCheckedFeatures" required />

                            <label for="checkbox" class="ml-1">
                                {{ feature }}
                            </label>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, defineEmits, ref, onBeforeUnmount, watch, onActivated } from 'vue';
import { useStore } from 'vuex';


const carStore = useStore()
const emit = defineEmits(['can-continue'])
const props = defineProps(['clickedNext', 'currentStep'])

defineExpose({
    handleNextBtnClick
})
const user_id = carStore.state.authStore.user._id
const features = carStore.getters.getFeatures
const fuels = carStore.getters.getFuels
const transmissions = carStore.getters.getTransmissions
const sortOptions = carStore.getters.getSortOptions
const typeOfCars = carStore.getters.getListTypeOfCars
const autoMakers = carStore.getters.getAutoMakers

const carRegistration = carStore.getters.getCarRegistration
const name = ref("")
const identifyNumber = ref("")
const sfc_100km = ref("")

const yearRange = []
initYearRange()

const seatRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const checkedFeatures = ref([])

const fuelSelected = ref("")
const typeOfCarsSelected = ref("")
const autoMakersSelected = ref("")
const transmissionsSelected = ref("")
const yearRangeSelected = ref("")
const seatRangeSelected = ref("")

function initYearRange() {
    const newDate = new Date()
    const newYear = parseInt(newDate.getFullYear())
    for (let i = 2005; i <= newYear; i++) {
        yearRange.push(i)
    }
}

function handleNextBtnClick() {
    console.log('handle next clicked')
    const carRegistrationPayload = {
        user_id,
        name: name.value,
        identifyNumber: identifyNumber.value,
        characteristics: JSON.stringify({
            typeOfCar: typeOfCarsSelected.value,
            autoMaker: autoMakersSelected.value,
            seats: seatRangeSelected.value,
            transmission: transmissionsSelected.value,
            fuel: fuelSelected.value,
            sfc_100km: sfc_100km.value,
            yearOfManufacture: yearRangeSelected.value
        }),
        features: checkedFeatures.value,
    }

    carStore.commit('setCarRegistration', carRegistrationPayload)
}

function checkFields() {
    console.log({ name, identifyNumber, autoMakersSelected, checkedFeatures })
    if (name && identifyNumber && sfc_100km && autoMakersSelected &&
        fuelSelected && typeOfCarsSelected && transmissionsSelected &&
        yearRangeSelected && seatRangeSelected && checkedFeatures.value.length > 0) {
        emit('can-continue', { value: true })
    } else {
        emit('can-continue', { value: false })
    }
}


watch([name, identifyNumber, sfc_100km, autoMakersSelected,
    fuelSelected, typeOfCarsSelected, transmissionsSelected,
    yearRangeSelected, seatRangeSelected, checkedFeatures], ([name, identifyNumber, sfc_100km, autoMakersSelected,
        fuelSelected, typeOfCarsSelected, transmissionsSelected,
        yearRangeSelected, seatRangeSelected, checkedFeatures]) => {

    if (name && identifyNumber && sfc_100km && autoMakersSelected &&
        fuelSelected && typeOfCarsSelected && transmissionsSelected &&
        yearRangeSelected && seatRangeSelected && checkedFeatures.length > 0) {
        emit('can-continue', { value: true })
    } else {
        emit('can-continue', { value: false })
    }

})

onActivated(() => {
    console.log('step 1 actived')
    checkFields()
})

onMounted(() => {
    checkFields()
    console.log({ carRegistration })
    console.log(props.clickedNext)
})

onBeforeUnmount(() => {

})

</script>

<style lang="scss" scoped></style>