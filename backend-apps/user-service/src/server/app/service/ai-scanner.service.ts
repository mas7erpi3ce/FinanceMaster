import * as request from 'request-promise'

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

interface AiScannerServicePostReq {
  billID: string,
  base64String: string,
}

interface AiScannerServicePutReq {
  point1: Point,
  point2: Point,
  point3: Point,
  point4: Point,
}

interface Point {
  x: number,
  y: number,
}

export class AiScannerService {
  // TODO -> set res Type
  public static async sendBill(bill: AiScannerServicePostReq) {
    const res = await request(getReqOptions('POST', '', bill));
    return res;
  }

  public static async updateBill(bill: AiScannerServicePutReq, billID: string) {
    const res = await request(getReqOptions('PUT', `update/${billID}`, bill));
    return res;
  }

} 