<template>
    <div class="relative p-4 mt-3 rounded-lg border border-gray-300 shadow-sm">
        <div>
            <div class="flex flex-col space-x-4">
                <div class="flex">
                    <div class="">
                        <img class="rounded-full w-20 h-20" loading="lazy"
                            src="https://n1-astg.mioto.vn/g/2022/01/11/08/QnTonJtJSUHkXkf0B8NTyA.jpg">
                    </div>

                    <div class="grid grid-row-2 gap-1 pl-2 absolute top-ne5 left-24   ">
                        <div class="font-medium text-xl pt-6">
                            {{ review.user_name }}
                        </div>
                        <div class="flex text-sm ">
                            <div class="grid grid-flow-col gap-1">
                                <div v-for="star in review.rate" :key="star">
                                    <font-awesome-icon :icon="['fas', 'star']" style="color: #f7fb32;" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div v-if="review.comment" class="text-base font-normal text-gray-500 py-4">
                    {{ review.comment }}
                </div>

                <div v-if="review.date_created" class="absolute top-2 right-4 text-base font-normal text-gray-500 ">
                    {{ review.date_created }}
                </div>


            </div>

        </div>

    </div>
</template>


<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
    review: Object
})

onMounted(() => {
    console.log({ props })
})


</script>

<style lang="scss" scoped></style>