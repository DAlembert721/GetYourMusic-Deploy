<template>
    <v-dialog v-model="dialogFlag" max-width="600px">
        <v-card>
            <v-card-title class="text-center">Comment</v-card-title>
            <div v-if="comments.length === 0" class="text-center my-7">
                There are no comments here
            </div>
            <div v-else class="ma-5">
                <v-list-item v-for="(comment, index) in comments" :key="comment.id">
                    <v-list-item-content>
                        <v-list-item-title class="my-3">{{ comment.text }}</v-list-item-title>
                        <v-divider v-if="index < comments.length - 1"></v-divider>
                    </v-list-item-content>
                </v-list-item>
            </div>
            <div v-if="addingComment === true">
                <v-textarea class="ma-5" solo label="comment" v-model="text"></v-textarea>
                <div class="d-flex justify-center">
                    <v-btn class="ma-5" text color="purple darken-2" @click="addComment">Comment</v-btn>
                    <v-btn class="ma-5" text color="purple darken-2" @click="addingComment = false">Cancel</v-btn>
                </div>
            </div>
            <v-card-actions v-if="addingComment === false" class="d-flex justify-center">
                <v-btn outlined text color="purple darken-2" @click="addingComment = true">Add comment</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import CommentDataService from "../../services/CommentDataService";

    export default {
        name: "PublicationComment",
        props: {
            dialog: Boolean,
            publicationId: Number
        },
        data: () => ({
            comments: [],
            addingComment: false,
            text: ''
        }),
        methods: {
            retrieveComments() {
                CommentDataService.getByPublicationId(this.publicationId).then(response => {
                    this.comments = response.data;
                });
            },
            addComment() {
                const commenterId = +localStorage.getItem('id');
                CommentDataService.createComment(commenterId, this.publicationId, this.text).then(() => {
                    this.retrieveComments();
                });
            }
        },
        mounted() {
            this.retrieveComments();
        },
        computed: {
            dialogFlag: {
                get: function () {
                    return this.dialog;
                },
                set: function (newValue) {
                    this.$emit('dialog-changed', newValue);
                }
            }
        }
    }
</script>

<style scoped>

</style>
