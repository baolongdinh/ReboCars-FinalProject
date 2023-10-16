<template>
    <div class="w-72">
        <!-- This is an example component -->
        <div class="rounded-lg shadow-lg">

            <aside class="" aria-label="Sidebar">
                <div class="px-3 py-4 overflow-y-auto rounded bg-white ">
                    <ul class="space-y-3 divide-y divide-gray-200">
                        <li>
                            <router-link to="/usercarsdashboard/mylistcars"
                                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 ">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M19.15 15.7199H19.6C20.51 15.7199 21.24 14.8599 21.24 13.8399V12.4499C21.24 11.7199 20.86 11.0399 20.27 10.7399L18.79 9.96995L17.47 7.59994C17.09 6.90994 16.42 6.49994 15.71 6.50994H10.12C9.47 6.50994 8.86 6.84995 8.47 7.42995L6.77 9.93994L3.96 10.7999C3.24 11.0199 2.75 11.7599 2.75 12.5999V13.8299C2.75 14.8499 3.48 15.7099 4.39 15.7099H4.63"
                                        stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                    </path>
                                    <path d="M8.87 15.72H14.77" stroke="black" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round"></path>
                                    <path
                                        d="M6.69 17.4598C7.83322 17.4598 8.76 16.5331 8.76 15.3898C8.76 14.2466 7.83322 13.3198 6.69 13.3198C5.54677 13.3198 4.62 14.2466 4.62 15.3898C4.62 16.5331 5.54677 17.4598 6.69 17.4598Z"
                                        stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                    </path>
                                    <path
                                        d="M17.08 17.4598C18.2232 17.4598 19.15 16.5331 19.15 15.3898C19.15 14.2466 18.2232 13.3198 17.08 13.3198C15.9368 13.3198 15.01 14.2466 15.01 15.3898C15.01 16.5331 15.9368 17.4598 17.08 17.4598Z"
                                        stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                    </path>
                                </svg>
                                <span class="flex-1 ml-3 whitespace-nowrap">Danh sách xe</span>

                            </router-link>

                        </li>
                        <li>
                            <router-link to="/usercarsdashboard/triporders"
                                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 ">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.85938 4.81V2.75" stroke="black" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round"></path>
                                    <path d="M17.1406 4.81V2.75" stroke="black" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round"></path>
                                    <path
                                        d="M18.05 3.7793H5.95C4.18 3.7793 2.75 5.20929 2.75 6.97929V18.0593C2.75 19.8293 4.18 21.2593 5.95 21.2593H18.06C19.83 21.2593 21.26 19.8293 21.26 18.0593V6.97929C21.25 5.20929 19.82 3.7793 18.05 3.7793Z"
                                        stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                    </path>
                                    <path d="M2.75 7.89844H21.25" stroke="black" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round"></path>
                                    <path
                                        d="M18 12C18.5523 12 19 11.5523 19 11C19 10.4477 18.5523 10 18 10C17.4477 10 17 10.4477 17 11C17 11.5523 17.4477 12 18 12Z"
                                        fill="black"></path>
                                    <path
                                        d="M14 12C14.5523 12 15 11.5523 15 11C15 10.4477 14.5523 10 14 10C13.4477 10 13 10.4477 13 11C13 11.5523 13.4477 12 14 12Z"
                                        fill="black"></path>
                                    <path
                                        d="M10 12C10.5523 12 11 11.5523 11 11C11 10.4477 10.5523 10 10 10C9.44772 10 9 10.4477 9 11C9 11.5523 9.44772 12 10 12Z"
                                        fill="black"></path>
                                    <path
                                        d="M6 12C6.55228 12 7 11.5523 7 11C7 10.4477 6.55228 10 6 10C5.44772 10 5 10.4477 5 11C5 11.5523 5.44772 12 6 12Z"
                                        fill="black"></path>
                                    <path
                                        d="M18 15.4902C18.5523 15.4902 19 15.0425 19 14.4902C19 13.9379 18.5523 13.4902 18 13.4902C17.4477 13.4902 17 13.9379 17 14.4902C17 15.0425 17.4477 15.4902 18 15.4902Z"
                                        fill="black"></path>
                                    <path
                                        d="M14 15.4902C14.5523 15.4902 15 15.0425 15 14.4902C15 13.9379 14.5523 13.4902 14 13.4902C13.4477 13.4902 13 13.9379 13 14.4902C13 15.0425 13.4477 15.4902 14 15.4902Z"
                                        fill="black"></path>
                                    <path
                                        d="M10 15.4902C10.5523 15.4902 11 15.0425 11 14.4902C11 13.9379 10.5523 13.4902 10 13.4902C9.44772 13.4902 9 13.9379 9 14.4902C9 15.0425 9.44772 15.4902 10 15.4902Z"
                                        fill="black"></path>
                                    <path
                                        d="M6 15.4902C6.55228 15.4902 7 15.0425 7 14.4902C7 13.9379 6.55228 13.4902 6 13.4902C5.44772 13.4902 5 13.9379 5 14.4902C5 15.0425 5.44772 15.4902 6 15.4902Z"
                                        fill="black"></path>
                                    <path
                                        d="M14 18.9707C14.5523 18.9707 15 18.523 15 17.9707C15 17.4184 14.5523 16.9707 14 16.9707C13.4477 16.9707 13 17.4184 13 17.9707C13 18.523 13.4477 18.9707 14 18.9707Z"
                                        fill="black"></path>
                                    <path
                                        d="M10 18.9707C10.5523 18.9707 11 18.523 11 17.9707C11 17.4184 10.5523 16.9707 10 16.9707C9.44772 16.9707 9 17.4184 9 17.9707C9 18.523 9.44772 18.9707 10 18.9707Z"
                                        fill="black"></path>
                                    <path
                                        d="M6 18.9707C6.55228 18.9707 7 18.523 7 17.9707C7 17.4184 6.55228 16.9707 6 16.9707C5.44772 16.9707 5 17.4184 5 17.9707C5 18.523 5.44772 18.9707 6 18.9707Z"
                                        fill="black"></path>
                                </svg>
                                <span class="flex-1 ml-3 whitespace-nowrap">Danh sách chuyến</span>

                            </router-link>

                        </li>

                        <li>
                            <router-link to="/usercarsdashboard/tripshistory"
                                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 ">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.85938 4.81V2.75" stroke="black" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round"></path>
                                    <path d="M17.1406 4.81V2.75" stroke="black" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round"></path>
                                    <path
                                        d="M18.05 3.7793H5.95C4.18 3.7793 2.75 5.20929 2.75 6.97929V18.0593C2.75 19.8293 4.18 21.2593 5.95 21.2593H18.06C19.83 21.2593 21.26 19.8293 21.26 18.0593V6.97929C21.25 5.20929 19.82 3.7793 18.05 3.7793Z"
                                        stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                    </path>
                                    <path d="M2.75 7.89844H21.25" stroke="black" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round"></path>
                                    <path
                                        d="M18 12C18.5523 12 19 11.5523 19 11C19 10.4477 18.5523 10 18 10C17.4477 10 17 10.4477 17 11C17 11.5523 17.4477 12 18 12Z"
                                        fill="black"></path>
                                    <path
                                        d="M14 12C14.5523 12 15 11.5523 15 11C15 10.4477 14.5523 10 14 10C13.4477 10 13 10.4477 13 11C13 11.5523 13.4477 12 14 12Z"
                                        fill="black"></path>
                                    <path
                                        d="M10 12C10.5523 12 11 11.5523 11 11C11 10.4477 10.5523 10 10 10C9.44772 10 9 10.4477 9 11C9 11.5523 9.44772 12 10 12Z"
                                        fill="black"></path>
                                    <path
                                        d="M6 12C6.55228 12 7 11.5523 7 11C7 10.4477 6.55228 10 6 10C5.44772 10 5 10.4477 5 11C5 11.5523 5.44772 12 6 12Z"
                                        fill="black"></path>
                                    <path
                                        d="M18 15.4902C18.5523 15.4902 19 15.0425 19 14.4902C19 13.9379 18.5523 13.4902 18 13.4902C17.4477 13.4902 17 13.9379 17 14.4902C17 15.0425 17.4477 15.4902 18 15.4902Z"
                                        fill="black"></path>
                                    <path
                                        d="M14 15.4902C14.5523 15.4902 15 15.0425 15 14.4902C15 13.9379 14.5523 13.4902 14 13.4902C13.4477 13.4902 13 13.9379 13 14.4902C13 15.0425 13.4477 15.4902 14 15.4902Z"
                                        fill="black"></path>
                                    <path
                                        d="M10 15.4902C10.5523 15.4902 11 15.0425 11 14.4902C11 13.9379 10.5523 13.4902 10 13.4902C9.44772 13.4902 9 13.9379 9 14.4902C9 15.0425 9.44772 15.4902 10 15.4902Z"
                                        fill="black"></path>
                                    <path
                                        d="M6 15.4902C6.55228 15.4902 7 15.0425 7 14.4902C7 13.9379 6.55228 13.4902 6 13.4902C5.44772 13.4902 5 13.9379 5 14.4902C5 15.0425 5.44772 15.4902 6 15.4902Z"
                                        fill="black"></path>
                                    <path
                                        d="M14 18.9707C14.5523 18.9707 15 18.523 15 17.9707C15 17.4184 14.5523 16.9707 14 16.9707C13.4477 16.9707 13 17.4184 13 17.9707C13 18.523 13.4477 18.9707 14 18.9707Z"
                                        fill="black"></path>
                                    <path
                                        d="M10 18.9707C10.5523 18.9707 11 18.523 11 17.9707C11 17.4184 10.5523 16.9707 10 16.9707C9.44772 16.9707 9 17.4184 9 17.9707C9 18.523 9.44772 18.9707 10 18.9707Z"
                                        fill="black"></path>
                                    <path
                                        d="M6 18.9707C6.55228 18.9707 7 18.523 7 17.9707C7 17.4184 6.55228 16.9707 6 16.9707C5.44772 16.9707 5 17.4184 5 17.9707C5 18.523 5.44772 18.9707 6 18.9707Z"
                                        fill="black"></path>
                                </svg>
                                <span class="flex-1 ml-3 whitespace-nowrap">Lịch sử chuyến đi</span>

                            </router-link>

                        </li>


                        <li>
                            <router-link to="/usercarsdashboard/contracts"
                                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 ">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M17.14 21.2H6.85999C5.71999 21.2 4.79999 20.28 4.79999 19.14V4.74994C4.79999 3.60994 5.71999 2.68994 6.85999 2.68994H17.14C18.28 2.68994 19.2 3.60994 19.2 4.74994V19.14C19.19 20.28 18.27 21.2 17.14 21.2Z"
                                        stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                    </path>
                                    <path d="M7.89001 6.85999H8.92001" stroke="black" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M12 6.85999H16.11" stroke="black" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round"></path>
                                    <path d="M7.89001 12H8.92001" stroke="black" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round"></path>
                                    <path d="M12 12H16.11" stroke="black" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round"></path>
                                    <path d="M7.89001 17.14H8.92001" stroke="black" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M12 17.14H16.11" stroke="black" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round"></path>
                                </svg>
                                <span class="flex-1 ml-3 whitespace-nowrap">Hợp đồng mẫu</span>

                            </router-link>
                        </li>

                        <li>
                            <router-link to="/userdashboard/myrewards"
                                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 ">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M19.15 16.8254H19.6C20.51 16.8254 21.24 15.9654 21.24 14.9454V13.5554C21.24 12.8254 20.86 12.1454 20.27 11.8454L18.79 11.0754L17.47 8.70541C17.09 8.01541 16.42 7.60541 15.71 7.61541H10.12C9.47 7.61541 8.86 7.95542 8.47 8.53542L6.77 11.0454L3.96 11.9054C3.24 12.1254 2.75 12.8654 2.75 13.7054V14.9354C2.75 15.9554 3.48 16.8154 4.39 16.8154H4.63"
                                        stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                    </path>
                                    <path d="M8.86914 16.8262H14.7691" stroke="black" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path
                                        d="M6.68914 18.5658C7.83237 18.5658 8.75914 17.639 8.75914 16.4958C8.75914 15.3526 7.83237 14.4258 6.68914 14.4258C5.54591 14.4258 4.61914 15.3526 4.61914 16.4958C4.61914 17.639 5.54591 18.5658 6.68914 18.5658Z"
                                        stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                    </path>
                                    <path
                                        d="M17.0798 18.5658C18.223 18.5658 19.1498 17.639 19.1498 16.4958C19.1498 15.3526 18.223 14.4258 17.0798 14.4258C15.9365 14.4258 15.0098 15.3526 15.0098 16.4958C15.0098 17.639 15.9365 18.5658 17.0798 18.5658Z"
                                        stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                    </path>
                                    <path
                                        d="M16.7729 13.1043C14.0369 13.1043 11.8203 10.8877 11.8203 8.15176C11.8203 5.41582 14.0369 3.19922 16.7729 3.19922C19.5088 3.19922 21.7254 5.41582 21.7254 8.15176C21.7254 10.8877 19.5088 13.1043 16.7729 13.1043Z"
                                        fill="white"></path>
                                    <path d="M16.5263 8.99701L15.584 8.05469" stroke="black" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M18.41 7.11328L16.5254 8.99793" stroke="black" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                                <span class="flex-1 ml-3 whitespace-nowrap">Đăng kí xe</span>

                            </router-link>
                        </li>

                    </ul>
                </div>
            </aside>

        </div>
    </div>
</template>

<script setup>

</script>

<style lang="css" scoped></style>