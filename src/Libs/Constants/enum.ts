export enum OrderStatus {
    PAYMENT_WAITING = 'playment waiting',   //รอชำระ
    PAYMENT_SUCCESS = 'playment success',   //ชำระแล้ว
    PAYMENT_FAILED = 'playment failed',     //ชำระล้มเหลว

    DELIVERY_WAITING = 'delivery waiting',  //รอจัดส่ง
    DELIVERY = 'delivery',  //กำลังจัดส่ง
    DELIVERY_FAILED = 'delivery failed',    //จัดส่งล้มเหลว

    SUCCESSFUL = 'successful',     //จัดส่งสำเร็จ
    CANCEL = 'cancel',     //ยกเลิก
    FAILED = 'failed'      //ล้มเหลว
}