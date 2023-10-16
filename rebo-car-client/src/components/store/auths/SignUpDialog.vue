<template>
    <VueFinalModal>

        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 relative ">
                <button @click="this.$emit('logout')"
                    class="absolute right-5 top-5 p-1 font-light border border-gray-900 hover:bg-gray-500  rounded-full leading-5">
                    <span>

                        <div class=" decoration-0 text-base px-1 mb-1 mx-1">
                            x
                        </div>
                    </span>
                </button>
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center ">
                        Đăng kí
                    </h1>
                    <form class="space-y-2 " action="#">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                            <input type="email" name="email" id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                required="">
                        </div>
                        <div>
                            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 ">Tên hiển thị</label>
                            <input type="username" name="username" id="username"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                required="">
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 "> Mật khẩu</label>
                            <input type="password" name="password" id="password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                                required="">
                        </div>

                        <div>
                            <label for="rePassword" class="block mb-2 text-sm font-medium text-gray-900 "> Nhập lại Mật
                                khẩu</label>
                            <input type="password" name="rePassword" id="rePassword"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                                required="">
                        </div>

                        <div>
                            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 ">Số điện thoại</label>
                            <input type="phone" name="phone" id="phone"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                required="">
                        </div>

                        <div class=" pt-4">
                            <button type="submit"
                                class="w-full text-black bg-primary-600 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border-2 border-gray-500 ">
                                Đăng ký</button>
                        </div>


                    </form>
                </div>
            </div>
        </div>

    </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal'
</script>

<style lang="scss" scoped></style>