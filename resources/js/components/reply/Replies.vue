<template>
    <div>
        <reply v-if="content" v-for="(reply, index) in content" :key="reply.id" :index=index :data="reply"></reply>
    </div>
</template>

<script>
    import Reply from "./Reply";

    export default {
        name: "Replies",
        components: {Reply},
        props: ['question'],
        data() {
            return {
                content: this.question.replies
            }
        },
        created() {
            this.listen();
        },
        methods: {
            listen() {
                EventBus.$on('new-reply', (reply) => {
                    this.content.unshift(reply);
                });

                EventBus.$on('delete-reply', (index) => {
                    axios.delete(`/api/question/${this.question.slug}/reply/${this.content[index].id}`)
                        .then(res => {
                            this.content.splice(index, 1);
                        });
                });

                Echo.private('App.User.' + User.id())
                    .notification((notification) => {
                        this.content.unshift(notification.reply);
                    });

                let channel = Echo.channel('delete-reply');
                channel.listen('DeleteReplyEvent', (e) => {
                    for(let index = 0; index < this.content.length; index++) {
                        if(this.content[index].id === e.reply_id) {
                            this.content.splice(index, 1);
                        }
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>
