<template>
    <v-dialog
            v-model="dialog"
            max-width="500px"
            transition="dialog-bottom-transition"
            persistent
            >
        <v-card>
            <v-card-title>
                New Message
            </v-card-title>
            <v-combobox
                    label="Receiver"
                    v-model="receiver"
                    :items="followeds"
                    :rules="rules"
                    color="purple"
                    item-text="name"
                    item-value="id"
                    return-object
                    class="ml-5 mr-5"
            >
            </v-combobox>
            <v-text-field
                    class="ml-5 mr-5"
                    label="Message"
                    v-model="message">

            </v-text-field>
            <v-card-actions>
                <v-btn color="purple"
                       class="white--text"
                       @click="addMessage">
                    Send
                </v-btn>
                <v-btn
                        color="purple"
                        text
                        @click="$emit('close-dialog')"
                >
                    Close
                </v-btn>
            </v-card-actions>

        </v-card>


    </v-dialog>
</template>

<script>
    import MessageDataService from "../../services/MessageDataService";

    export default {
        name: "NewMessageForm",
        props: {
            dialog: Boolean,
            followeds: Array
        },
        data: () => ({
            message: '',
            receiver: null,
            rules: [v => !!v || 'this space is required'],

        }),
        methods: {
            addMessage() {
                console.log(this.message+' '+ this.receiver.id);
                MessageDataService.postMessage(+localStorage.getItem('id'),+this.receiver.id,this.message)
                    .then(response => {
                        console.log(response.data);
                        this.$emit('close-dialog')
                    })
                    .catch(e => {
                        console.log(e);
                        this.$emit('close-dialog')
                    });
            }

        }
    }
</script>

<style scoped>

</style>