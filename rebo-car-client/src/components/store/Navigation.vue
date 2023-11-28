<template>
    <nav class="shadow-sm">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
            <button class="flex items-center" @click="pushToHome">
                <img src="https://img.freepik.com/premium-vector/car-rental-logo-template-design_316488-1614.jpg?w=740"
                    class="h-16 mr-3" alt="Rebocars Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-dark ">Rebocars</span>
            </button>
            <div class="flex items-center md:order-2">


                <div class="w-full flex" id="navbar-user">
                    <ul class="flex space-x-6 font-medium font-sans text-base p-4  rounded-lg">
                        <li>
                            <a href="#" class="block py-2   text-gray-900 rounded" aria-current="page">Về Rebocars</a>
                        </li>
                        <li v-if="user">
                            <router-link to="/carregister" class="block py-2  text-gray-900 rounded">Trở thành chủ
                                xe</router-link>
                        </li>
                    </ul>

                    <ul class="flex space-x-4 font-medium font-sans text-base p-4  border-l-[1px]">
                        <li v-if="!user">
                            <button href="#" class="block py-2  text-gray-900 rounded" @click="popUpSignUpDialog">Đăng
                                kí</button>
                        </li>

                        <li v-if="!user">
                            <button
                                class="block py-2 rounded-lg border border-gray-600 w-24  text-gray-900 text-center hover:bg-slate-500"
                                @click="show = true">
                                Đăng nhập
                            </button>

                        </li>

                        <li v-if="user" class="block py-2  text-gray-900 rounded" @click="pushToUserDashBoard">
                            {{ user.name }}
                        </li>

                    </ul>


                </div>

                <button v-if="user" type="button" class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 "
                    @click="pushToUserDashBoard">
                    <img v-if="user?.avatar" class="w-8 h-8 rounded-full" :src="getImage(user.avatar)">
                    <img v-else class="w-8 h-8 rounded-full"
                        src="https://pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png">
                </button>

            </div>

            <div class="opacity-80 bg-gray-800 fixed z-100 inset-0" v-if="show">
                <!-- OVERLAY SCREEN WHEN POP UP DIALOG MODAL -->

                <LoginDialog class=" absolute m-auto inset-0" v-model="show" @logout="hiddenDialog">

                </LoginDialog>
            </div>

            <div class="opacity-80 bg-gray-800 fixed z-100 inset-0" v-if="showSignUpDialog">
                <!-- OVERLAY SCREEN WHEN POP UP DIALOG MODAL -->

                <SignUpDialog class=" absolute m-auto inset-0" v-model="showSignUpDialog" @logout="hiddenSignUpDialog">

                </SignUpDialog>
            </div>


        </div>
    </nav>
</template>

<script setup>

import LoginDialog from './auths/LoginDialog.vue';
import SignUpDialog from './auths/SignUpDialog.vue';
import { ref, onMounted, onUpdated, computed, watch, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter()
const store = useStore()
const user = computed(() => store.state.authStore.user)
// handle show up promotions dialog
const show = ref(false)

function hiddenDialog() {
    show.value = false
}

const showSignUpDialog = ref(false)

function popUpSignUpDialog() {
    showSignUpDialog.value = true
}

function hiddenSignUpDialog() {
    showSignUpDialog.value = false
}


function pushToHome() {
    router.push({ path: "/" })
}

function pushToUserDashBoard() {
    router.push({ path: "/userdashboard/account" })
}

const base_url = inject('base_url')
function getImage(url) {
    return base_url + url
}

onMounted(async () => {
    console.log('on mounted', user.value)
})
onUpdated(() => {
    console.log('updated', user.value)
})

</script>

<style lang="scss" scoped></style>