
class BillModel:
    def __init__(self, base64String, billID, point1=(None, None), point2=(None, None), point3=(None, None), point4=(None, None)):
        self.base64String = base64String
        self.billID = billID
        self.point1 = {'x': point1[0], 'y': point1[1]}
        self.point2 = {'x': point2[0], 'y': point2[1]}
        self.point3 = {'x': point3[0], 'y': point3[1]}
        self.point4 = {'x': point4[0], 'y': point4[1]}

    def get(self):
        return {
            'Base64String': self.base64String,
            'billID': self.billID,
            'point1': self.point1,
            'point2': self.point2,
            'point3': self.point3,
            'point4': self.point4,
        }
