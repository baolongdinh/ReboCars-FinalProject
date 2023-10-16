<template>
    <div>
        <div class="font-bold font-sans text-3xl flex">
            Đổi mật khẩu
        </div>
        <div class="p-8 bg-white w-full relative rounded-lg shadow-md mt-5 h-355 ">
            <div>
                <div class="flex-col space-y-3">
                    <div class="flex-col space-y-1">
                        <div class="text-gray-500 font-sans font-semibold">
                            Mật khẩu hiện tại
                        </div>

                        <div>
                            <input class="w-full rounded-lg border-gray-300" type="text">
                        </div>

                    </div>

                    <div class="flex-col space-y-1">
                        <div class="text-gray-500 font-sans font-semibold">
                            Mật khẩu mới
                        </div>

                        <div>
                            <input class="w-full rounded-lg border-gray-300" type="text">
                        </div>

                    </div>

                    <div class="flex-col space-y-1">
                        <div class="text-gray-500 font-sans font-semibold">
                            Xác nhận mật khẩu mới
                        </div>

                        <div>
                            <input class="w-full rounded-lg border-gray-300" type="text">
                        </div>

                    </div>

                </div>

            </div>

            <div class="">
                <button
                    class="text-lg text-gray-700 font-semibold font-sans bg-gray-400 w-24 h-10 rounded-lg mt-6 float-right">
                    Xác nhận
                </button>
            </div>



        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>