<template>
    <div class="relative p-4 mt-3 rounded-lg border border-gray-300 shadow-sm">
        <div>
            <div class="flex flex-col space-x-4">
                <div class="flex">
                    <div class="">
                        <img class="rounded-full w-20 h-20" loading="lazy" :src="getImage(userAvatar)">
                    </div>

                    <div v-if="review?.user_name || review?.userName"
                        class="grid grid-row-2 gap-1 pl-2 absolute top-ne5 left-24   ">
                        <div class="font-medium text-xl pt-6">
                            {{ review.user_name || review.userName }}
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

                <div v-if="review?.comment" class="text-base font-normal text-gray-500 py-4">
                    {{ review.comment }}
                </div>

                <div v-if="review?.date_created" class="absolute top-4 right-4 text-base font-normal text-gray-500 ">
                    {{ date_string }}
                </div>


            </div>

        </div>

    </div>
</template>


<script setup>
import { ref, onMounted, inject } from "vue";

const props = defineProps({
    review: Object
})



const userAvatar = props.review.userAvatar || props.review.user_avatar

const date_string = new Date(props.review.date_created).toLocaleDateString();

const base_url = inject('base_url')
function getImage(url) {
    return base_url + url
}


onMounted(() => {
})


</script>

<style lang="scss" scoped></style>