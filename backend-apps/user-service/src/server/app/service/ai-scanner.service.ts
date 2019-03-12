import * as request from 'request-promise'

interface SendBillReq {
  billID: string;
  base64String: string;
}

interface SendBillRes {

}

interface UpdateBillReq {
  points: Point[];
}

interface UpdateBillRes {

}

interface Point {
  x: number;
  y: number;
}

const getReqOptions = <T>(method: 'GET' | 'POST' | 'PUT' | 'UPDATE', path: string = '', body?: T) => ({
  method: method,
  uri: `http://localhost:5000/api/${path}`,
  headers: {
    "Content-Type": "application/json",
    'Authorization': 'someSecret'
  },
  body: body,
  json: true // Automatically stringifies the body to JSON
});

export class AiScannerService {
  // TODO -> set res Type
  public static async sendBill(bill: SendBillReq) {
    const res: SendBillRes = await request(getReqOptions('POST', '', bill));
    return res;
  }

  public static async updateBill(bill: UpdateBillReq, billID: string) {
    const res: UpdateBillRes = await request(getReqOptions('PUT', `update/${billID}`, bill));
    return res;
  }

} 