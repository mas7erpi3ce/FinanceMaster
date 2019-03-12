
class BillModel:
    def __init__(self, base64String, billID, points=[
        {'y': None, 'x': None},
        {'y': None, 'x': None},
        {'y': None, 'x': None},
        {'y': None, 'x': None}
    ]):
        self.base64String = base64String
        self.billID = billID
        self.points = points

    def get(self):
        return {
            'Base64String': self.base64String,
            'billID': self.billID,
            'points': self.points,
        }
