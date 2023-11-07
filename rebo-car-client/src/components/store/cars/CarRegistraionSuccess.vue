<template>
    <div class="rounded-xl">
        <div class="md:mx-auto">
            <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
                <path fill="currentColor"
                    d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                </path>
            </svg>
            <div class="text-center">
                <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Đăng kí xe thành công
                </h3>
                <p class="text-gray-600 my-2">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
                <p> Mọi thông tin chi tiết xe sẽ được lưu ở phần quản lý xe của tôi </p>
                <div class="py-10 text-center" @click="goToUserCarDashBoard">
                    <button class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg">
                        Đi đến trang xe của tôi
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { useRouter } from 'vue-router';

const router = useRouter()

function goToUserCarDashBoard() {
    router.push({ path: '/usercarsdashboard/mylistcars' })
}

</script>

<style lang="scss" scoped></style>