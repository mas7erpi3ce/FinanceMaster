
export class Auth {

  static test = (req, res, next) => {
    console.log("test middlewARE")
    next()
  }

}