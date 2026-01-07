import Text from './Text';
import { useFormik } from 'formik';
import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import * as yup from 'yup';
import { useNavigate } from 'react-router';

import theme from '../theme';
import useSignIn from '../hooks/useSignIn';

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
  .min(1, "Username must be at least 1 character")
  .required('Username is required'),
  password: yup.string()
    .min(8, "Password must be at least 8 characters")
    .required('Password is required'),
})

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      navigate('/');
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }

  const initialValues = {
    username: '',
    password: '',
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

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text fontWeight="bold" style={{color: 'white'}}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;