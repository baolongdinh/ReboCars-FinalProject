<template>
    <div v-if="loaded" class="mt-36 flex items-center justify-center ">

        <div v-if="verifyEmailSuccess" class="p-6 bg-white rounded-lg shadow-md">
            <div class="flex items-center justify-center mb-6">
                <svg class="w-20 h-20 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
            <h2 class="text-3xl font-semibold text-center mb-4">Xác thực email thành công</h2>
            <p class="text-gray-600 text-center">
                Xin chúc mừng! Email của bạn đã được xác thực thành công.
            </p>
        </div>


        <div v-else class="p-6 bg-white rounded-lg shadow-md">
            <div class="flex items-center justify-center mb-6">
                <svg class="w-20 h-20 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </div>
            <h2 class="text-3xl font-semibold text-center mb-4">Xác thực email thất bại</h2>
            <p class="text-gray-600 text-center">
                Oops! Đã xảy ra lỗi khi xác minh email của bạn.
            </p>
        </div>



    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { RepositoryFactory } from "../../../apis/repositoryFactory";
import { onMounted, ref } from 'vue';
const authRepo = RepositoryFactory.get("auths");


const route = useRoute()
const verifyEmailSuccess = ref(false)
const loaded = ref(false)


onMounted(() => {
    console.log(route.query.token)
    authRepo.verifyEmail(route.query.token).then((result) => {
        verifyEmailSuccess.value = true
        loaded.value = true
    }).catch((err => {
        loaded.value = true
        console.log(err)
    }))
})

</script>

<style lang="scss" scoped></style>