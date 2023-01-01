import {gateway} from "@/services/_api";

export default function () {

    const fakePayment = (data) => {

        const config = {
            method: 'post', url: 'fakepayment/FakePayments', headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return gateway(config);


    }

    return {
        fakePayment
    }
}
