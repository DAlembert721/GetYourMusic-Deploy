<template>
    <v-list-item>
        <v-list-item-content>
            <v-list-item-title align="left" v-text="item.content"></v-list-item-title>
            <v-list-item-subtitle align="left"
                                  v-text="formatCompat(item.updateTime)"></v-list-item-subtitle>

            <div v-if="item.publicationType === 'video'">
                <iframe
                        width="200"
                        height="100"
                        v-bind:src="item.mediaUrl"
                        frameborder="0"
                        allow="accelerometer;  encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                </iframe>
            </div>
            <div v-else-if="item.publicationType === 'photo'">
                <v-img width="200"
                       height="100"
                       src="item.mediaUrl"></v-img>

            </div>
            <v-list-item-action class="d-flex justify-center" v-if="inOtherMusicianProfile">
                <v-btn x-small outlined text color="purple darken-2"
                       @click="setDialog(true)">View comment
                </v-btn>
            </v-list-item-action>
            <PublicationComment :dialog="viewCommentDialog" :publicationId="item.id"
                                @dialog-changed="setDialog"></PublicationComment>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
    import PublicationComment from "./PublicationComment";
    export default {
        name: "MusicianPublicationForProfile",
        components: {PublicationComment},
        props: {
            item: Object,
            inOtherMusicianProfile: Boolean
        },
        data: () => ({
            viewCommentDialog: false
        }),
        methods: {
            setDialog(newValue) {
                this.viewCommentDialog = newValue;
            },
            formatCompat(date) {
                const dateType = new Date(date);
                const ms = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                return dateType.getDate() + ' ' + ms[dateType.getMonth()] + ' ' + dateType.getFullYear();
            }
        }
    }
</script>

<style scoped>

</style>
