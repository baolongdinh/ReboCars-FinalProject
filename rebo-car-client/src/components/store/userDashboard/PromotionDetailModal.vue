<template>
    <VueFinalModal class="font-sans" content-class="">
        <div class="relative p-5 bg-white">
            <button @click="this.$emit('logout')">
                <span
                    class="absolute right-2 top-2 p-1 font-light border border-gray-400 hover:bg-gray-500  rounded-full leading-5">

                    <div class=" decoration-0 text-base px-1 mb-1 mx-1">
                        X
                    </div>
                </span>
            </button>
            <div class="">
                <img class="h-full rounded-md w-full" src="https://n1-cstg.mioto.vn/g/2023/09/02/10/KA9RRDZB.jpg">
            </div>

            <div class="px-6">
                <div class="font-bold text-2xl text-gray-800 mt-4 text-center ">
                    {{ promotion.discount_name }}
                </div>

                <div class="text-lg text-gray-800 mt-4 text-start ">
                    {{ promotion.discount_description }}
                </div>
            </div>


        </div>
    </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal'
import { onMounted, ref } from 'vue';

const props = defineProps({
    promotion: Object
})

onMounted(() => {
    console.log({ props })
})


</script>

<style lang="scss" scoped></style>