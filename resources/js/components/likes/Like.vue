<template>
    <div>
        <v-btn icon @click="likeIt">
            <v-icon :color="color">favorite</v-icon>
            {{count}}
        </v-btn>
    </div>
</template>

<script>
    export default {
        props: ['content'],
        name: "Like",
        data() {
            return {
                liked: this.content.liked,
                count: this.content.like_count
            }
        },
        created() {
            let channel = Echo.channel('like-channel');
            channel.listen('LikeEvent', (e) => {
                if (this.content.id === e.reply_id) {
                    e.type === 1 ? this.count++ : this.count--;
                }
            });
        },
        computed: {
            color() {
                return this.liked ? 'red' : 'red lighten-4';
            }
        },
        methods: {
            likeIt() {
                if (User.loggedIn()) {
                    this.liked ? this.decr() : this.incr();
                    this.liked = !this.liked;
                }
            },
            incr() {
                axios.post(`/api/${this.content.id}/like`)
                    .then(res => {
                        this.count++;
                    });
            },
            decr() {
                axios.delete(`/api/${this.content.id}/like`)
                    .then(res => {
                        this.count--;
                    });
            }
        }
    }
</script>

<style scoped>

</style>
