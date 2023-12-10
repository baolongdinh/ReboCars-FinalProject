<template>
    <VueFinalModal>
        <div class="p-12 font-sans flex flex-col space-y-4 relative">

            <div class="font-bold text-3xl text-center pb-12">
                Chỉnh sửa hình ảnh xe
            </div>
            <button type="button" @click="this.$emit('logout')"
                class=" absolute top-1 right-5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span class="sr-only">Close modal</span>
            </button>

            <div>
                <div class="font-normal text-lg pt-2">
                    Đăng nhiều hình ở các góc độ khác nhau để tăng thông tin cho xe của bạn (tối thiểu 3 hình)
                </div>


                <div class="w-32 h-10 mx-auto  ">
                    <input class="" type="file" accept="image/*" multiple="multiple" @change="previewMultiImage"
                        id="my-file">

                </div>


                <div v-if="preview_list?.length" class="border-t-2 mt-5 ">
                    <div class="text-gray-600 font-semibold text-xl">
                        Preview
                    </div>
                    <div class="pt-2 grid grid-cols-2 gap-4">
                        <div v-for="item, index in preview_list" :key="index">
                            <img :src="item" class="img-fluid rounded-lg" />
                        </div>
                    </div>

                </div>

                <div v-else class="border-t-2 mt-5 ">
                    <div class="text-gray-600 font-semibold text-xl">
                        Preview
                    </div>
                    <div v-if="car?.images" class="pt-2 grid grid-cols-2 gap-4">
                        <div v-for="item, index in car.images" :key="index">
                            <img :src="getImage(item)" class="img-fluid rounded-lg" />
                        </div>
                    </div>

                </div>

            </div>

            <div class="border-top mt-2 w-full h-16 z-40 left-0 bottom-0">
                <div class="flex gap-2 mt-3 h-10 absolute right-5">
                    <button class=" ml-auto px-auto border w-24 rounded-lg bg-gray-400 hover:bg-gray-700 "
                        @click="this.$emit('logout')">
                        Hủy
                    </button>
                    <button class=" ml-auto px-auto border w-24 rounded-lg bg-green-500 hover:bg-green-700"
                        @click="handleBtnConfirmUpdateCarImages">
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal'
import { onMounted, defineEmits, ref, onBeforeUnmount, watch, onUpdated, onActivated, inject } from 'vue';
import { useStore } from 'vuex';
import { RepositoryFactory } from "../../../../apis/repositoryFactory";
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification()
const carsRepo = RepositoryFactory.get('cars')

const props = defineProps({
    car: Object
})

const carStore = useStore()

const emit = defineEmits(['handleBtnConfirmUpdateCarImages'])

const preview = ref(null)
const image = ref(null)
const preview_list = ref([])
const image_list = ref([])

function previewImage(event) {
    var input = event.target;
    if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
            preview.value = e.target.result;
        }
        image.value = input.files[0];
        reader.readAsDataURL(input.files[0]);
    }
}

function previewMultiImage(event) {
    var input = event.target;
    var count = input.files.length;
    var index = 0;
    if (input.files) {
        preview_list.value = []
        while (count--) {
            var reader = new FileReader();
            reader.onload = (e) => {
                preview_list.value.push(e.target.result);
            }
            image_list.value.push(input.files[index]);
            reader.readAsDataURL(input.files[index]);
            index++;
        }
    }
}
function reset() {
    image.value = null;
    preview.value = null;
    image_list.value = [];
    preview_list.value = [];
}

const base_url = inject('base_url')
function getImage(url) {
    return base_url + url
}

function convertObjToFormData(obj) {
    const formData = new FormData()
    for (var key in obj) {
        if (key === 'images') {
            for (let i = 0; i < obj.images.length; i++) {
                formData.append(key, obj.images[i]);
            }
        } else {
            formData.append(key, obj[key]);
        }

    }
    return formData
}

function handleBtnConfirmUpdateCarImages() {

    const data = {
        images: image_list.value
    }

    const payload = convertObjToFormData(data)

    carsRepo.updatedCarImages(props.car._id, payload).then((result) => {
        console.log({ result })
        notify({
            title: 'Thông báo',
            text: 'Thay đổi hình ảnh xe thành công.',
            type: 'success'
        });
        emit('handleBtnConfirmUpdateCarImages')
    }).catch((err) => {
        console.error(err.response)
        notify({
            title: 'Error',
            text: err.response.data.message,
            type: 'error'
        });
    })

}


onMounted(() => {

})

onUpdated(() => {
    console.log('updated', preview_list.value)
})

onBeforeUnmount(() => {
    console.log('un mounted')

})

</script>

<style src="@vueform/slider/themes/default.css"></style>