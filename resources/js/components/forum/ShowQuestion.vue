<template>
    <v-card>
        <v-container>
            <v-card-title>
                <div>
                    <div class="headline">
                        {{question.title}}
                    </div>
                    <span class="grey--text">
                    {{question.user}} said {{question.created_at}}
                    </span>
                </div>
                <v-spacer></v-spacer>
                <v-btn color="teal" dark>{{reply_count}} Replies</v-btn>
            </v-card-title>
            <v-card-text v-html="body">
            </v-card-text>
            <v-card-actions v-if="own">
                <v-btn icon small @click="edit">
                    <v-icon color="orange">edit</v-icon>
                </v-btn>
                <v-btn icon small @click="destroy">
                    <v-icon  color="red">delete</v-icon>
                </v-btn>
            </v-card-actions>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        name: "ShowQuestion",
        props: ['question'],
        data() {
            return {
                own: User.own(this.question.user_id),
                reply_count: this.question.reply_count
            }
        },
        computed: {
            body() {
                return md.parse(this.question.body);
            }
        },
        methods: {
            destroy() {
                axios.delete(`/api/question/${this.question.slug}`)
                .then(res => this.$router.push('/forum'))
                .catch(err => console.log(err.response.data));
            },
            edit() {
                EventBus.$emit('start-editing');
            }
        },
        created() {
            //New reply
            EventBus.$on('new-reply', (reply) => {
                this.reply_count++;
            });
            Echo.private('App.User.' + User.id())
                .notification((notification) => {
                    this.reply_count++;
                });

            //Delete reply
            EventBus.$on('delete-reply', (index) => {
                this.reply_count--;
            });
            let channel = Echo.channel('delete-reply');
            channel.listen('DeleteReplyEvent', (e) => {
                this.reply_count--;
            });
        }
    }
</script>

<style scoped>

</style>
