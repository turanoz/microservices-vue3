import {gateway} from "@/services/_api";
export default function () {
    const fakePayment = (data) => {
        return gateway({
            method: 'post', url: 'fakepayment/FakePayments', headers: {
                'Content-Type': 'application/json'
            },
            data: data
        });
    }
    return {
        fakePayment
    }
}
