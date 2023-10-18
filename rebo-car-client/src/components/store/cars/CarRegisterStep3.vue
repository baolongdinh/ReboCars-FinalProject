<template>
    <div class="p-12 font-sans flex flex-col space-y-4">
        <div>
            <div class="font-bold text-2xl text-center">
                Hình ảnh
            </div>

            <div class="font-normal text-lg pt-2">
                Đăng nhiều hình ở các góc độ khác nhau để tăng thông tin cho xe của bạn (tối thiểu 3 hình)
            </div>

            <div class="w-335 h-60 bg-blue-50 rounded-xl mx-auto mt-4">
                <div class="w-32 h-11 ml-28 pt-24">
                    <button class="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-800 ">
                        CHỌN HÌNH
                    </button>
                </div>

            </div>


        </div>
    </div>
</template>

<script setup>
import { onMounted, defineEmits, ref } from 'vue';
import { useStore } from 'vuex';
import Slider from '@vueform/slider'


const emit = defineEmits(['can-continue'])



onMounted(() => {
    emit('can-continue', { value: true })
})

</script>

<style src="@vueform/slider/themes/default.css"></style>