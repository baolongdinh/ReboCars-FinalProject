<template>
    <div id="fb-root">
        <div class="fb-customerchat" attribution="setup_tool" page_id="186208234569773" theme_color="#0000FF"
            logged_in_greeting="YOUR_LOGGED_IN_GREETING" logged_out_greeting="YOUR_LOGGED_OUT_GREETING"></div>
    </div>
</template>

<script>
export default {
    mounted() {
        // Render the Facebook Chat plugin
        FB.XFBML.parse();
    }
};
</script>

<style scoped></style>
