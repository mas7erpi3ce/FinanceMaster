from functools import wraps
from sanic import response


def preloader(names: list):
    def decorator(f):
        @wraps(f)
        async def decorated_function(request, *args, **kwargs):
            try:
                for name in names:
                    value = request.json[name]
                    request[name] = value

            except:
                return response.json(
                    {'message':
                        'Request body needs to include:' +
                        " ".join(names)},
                    status=400
                )

            res = await f(request, *args, **kwargs)
            return res

        return decorated_function
    return decorator
