<template>
    <VueFinalModal>

        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 relative ">
                <button @click="emitPopDownDialog"
                    class="absolute right-5 top-5 p-1 font-light border border-gray-900 hover:bg-gray-500  rounded-full leading-5">
                    <span>

                        <div class=" decoration-0 text-base px-1 mb-1 mx-1">
                            x
                        </div>
                    </span>
                </button>

                <ForgotPassword v-if="showForgotPwd"> </ForgotPassword>

                <div v-else class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center ">
                        Đăng nhập
                    </h1>
                    <div v-if="alertMessage"
                        class="text-center py-2 rounded-md w-full bg-red-400 text-white font-medium text-lg h-10">
                        {{ alertMessage }}
                    </div>
                    <div class="space-y-4 md:space-y-6">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                            <input type="email" name="email" id="email" v-model="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                placeholder="youremail@gmail.com" required="">
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                            <input type="password" name="password" id="password" v-model="password" placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                                required="">
                        </div>
                        <div class="flex items-center float-right">

                            <a @click="handleClickForgotPwd" class="text-sm font-medium text-primary-600 hover:underline ">
                                Quên mật khẩu? </a>
                        </div>
                        <button type="submit"
                            class="w-full text-black bg-primary-600 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border-2 border-gray-500 "
                            @click="handleSignInBtn">
                            Sign in</button>


                        <div class="flex space-x-2 ">
                            <button type="button"
                                class="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
                                <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab"
                                    data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 320 512">
                                    <path fill="currentColor"
                                        d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z">
                                    </path>
                                </svg>
                                Sign in with Facebook
                            </button>
                            <button type="button"
                                class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                                <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab"
                                    data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                    <path fill="currentColor"
                                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z">
                                    </path>
                                </svg>
                                Sign in with Google
                            </button>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal'
import { ref } from 'vue'
import { useStore } from 'vuex'
import ForgotPassword from './ForgotPassword.vue';


const showForgotPwd = ref(false)
const emit = defineEmits(['logout'])
const store = useStore()
const alertMessage = ref('')


const email = ref('')
const password = ref('')

function emitPopDownDialog() {
    emit('logout')
}

function handleClickForgotPwd() {
    showForgotPwd.value = true
}

async function handleSignInBtn() {
    const payload = {
        email: email.value,
        password: password.value
    }
    console.log(payload)
    store.dispatch('login', payload)
        .then(() => {
            emitPopDownDialog()
        })
        .catch(err => {
            alertMessage.value = err.response.data.message
        })

}



</script>

<style lang="scss" scoped></style>