
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

    @staticmethod
    def verify(name, value):
        if(name == "base64String"):
            if(isinstance(value, str)):
                return
            else:
                raise ValueError('type not accepted')
        if(name == "billID"):
            if(isinstance(value, str)):
                return
            else:
                raise ValueError('type not accepted')
        if(name == "points"):
            if(len(value) != 4):
                raise ValueError('list should have 4 points')
            for point in value:
                x = point['x']
                y = point['y']
            return
