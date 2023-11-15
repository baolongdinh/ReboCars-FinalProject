<template>
    <div class="p-12 font-sans flex flex-col space-y-4">
        <div>
            <div class="font-bold text-2xl text-center">
                Hình ảnh
            </div>

            <div class="font-normal text-lg pt-2">
                Đăng nhiều hình ở các góc độ khác nhau để tăng thông tin cho xe của bạn (tối thiểu 3 hình)
            </div>


            <div class="w-32 h-10 mx-auto  ">
                <input class="" type="file" accept="image/*" multiple="multiple" @change="previewMultiImage" id="my-file">

            </div>


            <div v-if="preview_list.length" class="border-t-2 mt-5 ">
                <div class="text-gray-600 font-semibold text-xl">
                    Preview
                </div>
                <div class="pt-2 grid grid-cols-2 gap-4">
                    <div v-for="item, index in preview_list" :key="index">
                        <img :src="item" class="img-fluid rounded-lg" />
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script setup>
import { onMounted, defineEmits, ref, onBeforeUnmount, watch, onUpdated, onActivated } from 'vue';
import { useStore } from 'vuex';
import Slider from '@vueform/slider'

defineExpose({
    handleNextBtnClick
})


const emit = defineEmits(['can-continue'])
const props = defineProps(['clickedNext', 'currentStep'])
const carStore = useStore()

const carRegistration = carStore.getters.getCarRegistration


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

function handleNextBtnClick() {
    console.log('step 3')
    const addFields = {
        images: image_list.value,
        preview_list: preview_list.value
    }
    const carRegistrationPayload = { ...carRegistration, ...addFields }
    carStore.commit('setCarRegistration', carRegistrationPayload)
}

watch(preview_list, (preview_list) => {
    if (preview_list) {
        emit('can-continue', { value: true })
    } else {
        emit('can-continue', { value: false })
    }
})

function checkFields() {
    if (preview_list.value.length > 0) {
        emit('can-continue', { value: true })
    } else {
        emit('can-continue', { value: false })
    }
}

onActivated(() => {
    checkFields()
})

onMounted(() => {
    checkFields()
    console.log({ carRegistration })
})

onUpdated(() => {
    console.log('updated', preview_list.value)
})

onBeforeUnmount(() => {
    console.log('un mounted')

})

</script>

<style src="@vueform/slider/themes/default.css"></style>