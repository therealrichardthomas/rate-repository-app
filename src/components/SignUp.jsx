import { Pressable, View, TextInput, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import { useNavigate } from "react-router-native";
import * as yup from 'yup';
import theme from "../theme";
import { useMutation } from "@apollo/client/react";
import { CREATE_USER } from "../graphql/mutations";
import useSignIn from "../hooks/useSignIn";


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'white',
  },
  input: {
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 10,
    padding: 15,
    fontSize: theme.fontSizes.subheading,
  },
  button: {
    backgroundColor: theme.backgroundColors.tagBg,
    borderRadius: 5,
    margin: 10,
    padding: 15,
    flexDirection: 'row', 
    justifyContent: 'center'
  }
});

const validationSchema = yup.object().shape({
  username: yup.string()
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username cannot be more than 30 characters')
    .required('Username is required'),
  password: yup.string()
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password cannot be more than 50 characters')
    .required('Password is required'),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null])
    .required("Password confirmation is required")
});

export const SignUpContainer = ({onSubmit}) => {
  const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  const getInputStyle = fieldName => [
    styles.input,
    formik.touched[fieldName] && formik.errors[fieldName] 
      ? { borderColor: theme.colors.error} 
      : { borderColor: theme.colors.textSecondary}
  ]


  return (  
    <View style={styles.container}>
      <TextInput 
        style={getInputStyle('username')} 
        placeholder="Username" 
        value={formik.values.username} 
        onChangeText={formik.handleChange('username')} 
        autoCapitalize='none'
        autoCorrect={false}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: 'red', marginLeft: 10}}>{formik.errors.username}</Text>
      )}

      <TextInput 
        style={getInputStyle('password')} 
        placeholder="Password" secureTextEntry 
        value={formik.values.password} 
        onChangeText={formik.handleChange('password')} 
        autoCapitalize='none'
        autoCorrect={false}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: 'red', marginLeft: 10 }}>{formik.errors.password}</Text>
      )}

      <TextInput 
        style={getInputStyle('passwordConfirmation')} 
        placeholder="Password confirmation" secureTextEntry 
        value={formik.values.passwordConfirmation} 
        onChangeText={formik.handleChange('passwordConfirmation')} 
        autoCapitalize='none'
        autoCorrect={false}
      />
      {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
        <Text style={{ color: 'red', marginLeft: 10 }}>{formik.errors.passwordConfirmation}</Text>
      )}  

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text fontWeight="bold" style={{color: 'white'}}>Sign Up</Text>
      </Pressable>
    </View>
  );

}

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password, passwordConfirmation } = values;

    try {
      await createUser({
        variables: {
          username,
          password
        }
      })

      const { data } = await signIn({ username, password });
      navigate('/', {replace: true});

    } catch (e) {
      console.log("Unexpected error occurred: ", e.message);
    }

  }

  return (
    <SignUpContainer onSubmit={onSubmit} />
  )
};



export default SignUp;