
export interface BillInfo {
  billID: string;
  points: {
    point1: Point;
    point2: Point;
    point3: Point;
    point4: Point;
  };
}

interface Point {
  x: number;
  y: number;
}
