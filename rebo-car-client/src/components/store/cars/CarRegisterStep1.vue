<template>
    <div class="p-12 font-sans flex flex-col space-y-4">
        <div class="flex flex-col space-y-1">
            <div class="font-semibold text-xl">
                Tên xe
            </div>
            <div class="font-normal text-red-500 text-sm">
                Lưu ý: Tên xe sẽ không thể thay đổi sau khi đăng kí
            </div>

            <div>
                <input type="text" class="w-305 h-11 rounded-lg border-gray-300 focus:border-blue-500">
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
                <input type="text" class="w-305 h-11 rounded-lg border-gray-300 focus:border-blue-500">
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

                    <select class="w-305 h-11 rounded-lg border-gray-300" v-model="selected">
                        <option selected value="">Please select one</option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                    </select>
                </div>

                <div>
                    <div class="font-normal text-gray-600 text-base pb-2">Số ghế</div>

                    <select class="w-305 h-11 rounded-lg border-gray-300" v-model="selected">
                        <option disabled value="">Please select one</option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                    </select>
                </div>

                <div>
                    <div class="font-normal text-gray-600 text-base pb-2">Năm sản suất</div>

                    <select class="w-305 h-11 rounded-lg border-gray-300" v-model="selected">
                        <option disabled value="">Please select one</option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                    </select>
                </div>

                <div>
                    <div class="font-normal text-gray-600 text-base pb-2">Truyền động</div>

                    <select class="w-305 h-11 rounded-lg border-gray-300" v-model="selected">
                        <option disabled value="">Please select one</option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                    </select>
                </div>

                <div>
                    <div class="font-normal text-gray-600 text-base pb-2">Loại nhiên liệu</div>

                    <select class="w-305 h-11 rounded-lg border-gray-300" v-model="selected">
                        <option disabled value="">Please select one</option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
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
                <input type="text" class="w-305 h-11 rounded-lg border-gray-300 focus:border-blue-500">
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
                                @change="handleCheckedFeatures" />

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
import { onMounted, defineEmits } from 'vue';
import { useStore } from 'vuex';


const carStore = useStore()
const emit = defineEmits(['can-continue'])

const features = carStore.getters.getFeatures


onMounted(() => {
    emit('can-continue', { value: true })
})

</script>

<style lang="scss" scoped></style>