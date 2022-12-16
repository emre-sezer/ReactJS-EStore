import { useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "../sign-in-form/sign-in-form.style.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

 

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

   

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const {user} = await signInAuthUserWithEmailAndPassword(email, password);
      
      resetFormFields();
    } catch (error) {

      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
          case 'auth/user-not-found':
            alert('no user associated with this email');
            break;
      
        default:
          break;
      }

    


    }
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();

     
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />

        <FormInput
          label="Password"
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            {" "}
            Google Sign In{" "}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
