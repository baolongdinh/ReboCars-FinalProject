<template>
    <div>
        <form>

            <div class="relative">
                <div class="relative">
                    <input type="search" class="pl-10 pr-4 py-2 border rounded-md w-full h-9 border-gray-300"
                        placeholder="Tìm kiếm địa chỉ" @keyup="handleKeyup($event.target.value)" v-model="inputValue"
                        id="default-search" />
                    <button class="absolute inset-y-0 left-0 pl-3 
                    flex items-center 
                    pointer-events-none">

                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.9989 14.1714C9.86891 14.1714 8.12891 12.4414 8.12891 10.3014C8.12891 8.16141 9.86891 6.44141 11.9989 6.44141C14.1289 6.44141 15.8689 8.17141 15.8689 10.3114C15.8689 12.4514 14.1289 14.1714 11.9989 14.1714ZM11.9989 7.94141C10.6989 7.94141 9.62891 9.00141 9.62891 10.3114C9.62891 11.6214 10.6889 12.6814 11.9989 12.6814C13.3089 12.6814 14.3689 11.6214 14.3689 10.3114C14.3689 9.00141 13.2989 7.94141 11.9989 7.94141Z"
                                fill="black"></path>
                            <path
                                d="M12.0016 22.76C10.5216 22.76 9.03164 22.2 7.87164 21.09C4.92164 18.25 1.66164 13.72 2.89164 8.33C4.00164 3.44 8.27164 1.25 12.0016 1.25C12.0016 1.25 12.0016 1.25 12.0116 1.25C15.7416 1.25 20.0116 3.44 21.1216 8.34C22.3416 13.73 19.0816 18.25 16.1316 21.09C14.9716 22.2 13.4816 22.76 12.0016 22.76ZM12.0016 2.75C9.09164 2.75 5.35164 4.3 4.36164 8.66C3.28164 13.37 6.24164 17.43 8.92164 20C10.6516 21.67 13.3616 21.67 15.0916 20C17.7616 17.43 20.7216 13.37 19.6616 8.66C18.6616 4.3 14.9116 2.75 12.0016 2.75Z"
                                fill="black"></path>
                        </svg>

                    </button>
                </div>

                <div>
                    <ul class="absolute z-50 mt- space-y-4 bg-gray-200">
                        <li v-for="(item, index) in placeList " v-bind:key="index">
                            <div class=" hover:bg-gray-400 text-left">
                                <p @click="handleClickLocation(item)">
                                    {{ item.description }}
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>

        </form>
    </div>
</template>

<script >
import apiKey from "../../configs/apikey.config"
import { ref, onUpdated, onMounted, watch, reactive, defineEmits } from 'vue'
import locationIcon from "../../assets/icons/location.svg"

export default {
    props: {
        searchValue: String
    },
    setup(props, { emit }) {

        const placeList = ref([])
        const inputValue = ref(props.searchValue) || ref("")
        console.log({ inputValue })
        const fetchApi = async (apiKey, input) => {
            const data = await fetch(`https://rsapi.goong.io/Place/AutoComplete?api_key=${apiKey}&location=21.013715429594125,%20105.79829597455202&input=${input}`)
            return data.json()
        }

        // Init a timeout variable to be used below
        let timeout = null;

        const handleKeyup = async (input) => {
            try {
                clearTimeout(timeout);

                // Make a new timeout set to go off in 1000ms (1 second)
                timeout = setTimeout(async function () {
                    console.log('Input Value:', input);
                    let data = await fetchApi(apiKey.goongMapAPI, input)
                    placeList.value = data.predictions
                    console.log('place list: ', placeList.value)

                }, 50);
            } catch (error) {
                console.error(error)

            }

        }

        function handleClickLocation(value) {
            inputValue.value = value.description //change model input vale
            placeList.value = null
            const location = {
                compound: value.compound,
                description: value.description,
                place_id: value.place_id
            }
            emit('selectedValue', location)
        }



        return {
            placeList,
            handleKeyup,
            inputValue,
            handleClickLocation,

        }
    }
}




</script>

<style lang="scss" scoped></style>