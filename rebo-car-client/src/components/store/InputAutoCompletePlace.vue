<template>
    <div>
        <form>

            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">

                </div>
                <input type="search" @keyup="handleKeyup($event.target.value)" v-model="inputValue" id="default-search"
                    class="block w-5/6 min-w-250 h-33 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Searching..." required>

                <div>
                    <ul class="absolute mt-5 space-y-4 ">
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

export default{
    setup(props, { emit }) {   
        const placeList = ref([])
        const inputValue = ref('')
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

                }, 400);
            } catch (error) {
                console.error(error)

            }

        }

        function handleClickLocation(value) {
            inputValue.value = value.description //change model input vale
            placeList.value = null

            emit('selectedValue', value.compound)
        }


        onUpdated(() => {
            console.log('component update')
        })
        onMounted(() => {
            console.log('component mount')
        })

        return {
            placeList,
            handleKeyup,
            inputValue,
            handleClickLocation
        }
    }
}




</script>

<style lang="scss" scoped></style>