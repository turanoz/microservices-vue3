import {reactive} from "vue";

const details = reactive({
    cardName: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
    totalPrice: 0,
    order: {
        buyerId: "",
        orderItems: [],
        address: {
            province: "",
            district: "",
            street: "",
            zipCode: "",
            line: ""
        }
    }
});
export default function () {
    return {
        details
    }
}
