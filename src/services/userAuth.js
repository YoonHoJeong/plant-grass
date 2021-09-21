import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  email: Yup.string() //
    .email("Invaild email")
    .required("Required!"),
  password: Yup.string()
    .min(8, "Too short!")
    .max(12, "Too Long!")
    .required("Required!"),
});

export default class UserAuth {
  constructor() {
    this.auth = getAuth();
  }

  async login(email, password) {
    //
  }

  async signup(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user = userCredential.user;
      return user;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
