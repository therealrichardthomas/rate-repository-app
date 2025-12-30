import Text from './Text';
import { useFormik } from 'formik';
import { TextInput, Pressable, View, StyleSheet } from 'react-native';

import theme from '../theme';

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
})

const SignIn = () => {

  const initialValues = {
    username: '',
    password: '',
  };

  const onSubmit = (values) => {
    console.log(values);
    if (values.username !== "" && values.password !== "") {
      console.log(`User: ${values.username} Password: ${values.password}`)
    } else {
      console.error(`Username and Password cannot be empty`)
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit
  })


  return (  
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Username" value={formik.values.username} onChangeText={formik.handleChange('username')} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={formik.values.password} onChangeText={formik.handleChange('password')} />
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text fontWeight="bold" style={{color: 'white'}}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;