<template>
    <div class="mt-4">
        <vue-simplemde v-model="body" ref="markdownEditor" />
        <v-btn dark color="green" @click="submit">
            Reply
        </v-btn>
    </div>
</template>

<script>
    export default {
        name: "NewReply",
        props: ['questionSlug'],
        data() {
            return {
                body: null
            }
        },
        methods: {
            submit() {
                axios.post(`/api/question/${this.questionSlug}/reply`, {body: this.body})
                    .then(res => {
                        this.body = null;
                        EventBus.$emit('new-reply', res.data.reply)
                        window.scrollTo(0,0);
                    });
            }
        }
    }
</script>

<style scoped>

</style>
