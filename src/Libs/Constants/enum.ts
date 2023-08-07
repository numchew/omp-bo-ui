export enum OrderStatus {
    PAYMENT_WAITING = 'payment waiting',   //รอชำระ
    PAYMENT_SUCCESS = 'payment success',   //ชำระแล้ว
    PAYMENT_FAILED = 'payment failed',     //ชำระล้มเหลว

    DELIVERY_WAITING = 'delivery waiting',  //รอจัดส่ง
    DELIVERY = 'delivery',  //กำลังจัดส่ง
    DELIVERY_FAILED = 'delivery failed',    //จัดส่งล้มเหลว

    SUCCESSFUL = 'successful',     //จัดส่งสำเร็จ
    CANCEL = 'cancel',     //ยกเลิก
    FAILED = 'failed'      //ล้มเหลว
}

