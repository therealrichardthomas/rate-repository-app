import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import theme from '../theme';

import { useMutation } from '@apollo/client/react';
import { CREATE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: theme.backgroundColors.repoItemBg,
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
  multiInput: {
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 10,
    padding: 15,
    paddingTop: 15,
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
  repositoryOwnerName: yup.string()
    .required('Repository owner name is required'),
  repositoryName: yup.string()
    .required('Repository name required'),
  rating: yup.number()
    .integer("Rating must be an integer")
    .min(0, "Rating must be at least 0")
    .max(100, "Rating can be at most 100")
    .required('Rating is required'),
  review: yup.string()

})


const ReviewForm = () => {
  const navigate = useNavigate();
  const [createReview] = useMutation(CREATE_REVIEW);

  const initialValues = {
    repositoryOwnerName: '',
    repositoryName: '',
    rating: '',
    review: ''
  }


  const onSubmit = async (values) => {
    const { repositoryOwnerName, repositoryName, rating, review } = values;

    try {
      const {data} = await createReview({
        variables: {
          ownerName: repositoryOwnerName,
          repositoryName: repositoryName,
          rating: parseInt(rating),
          text: review,
        }
      });

      navigate(`/repository/${data.createReview.repositoryId}`, { replace: true })

      
    } catch (e) {
      console.log(e);
      if (e.message.includes('has already reviewed')) {
        formik.setErrors({
          repositoryName: 'You have already reviewed this repository'
        })
      } else if (e.message.includes('not exist') || e.message.includes('repository not found')) {
        formik.setErrors({
          repositoryName: 'This repository does not exist'
        });
      } else {
        console.log("Unexpected Error: ", e.message);
      }
    }
  }

  const formik = useFormik({
    initialValues, 
    validationSchema,
    onSubmit
  });

  const getInputStyle = fieldName => [
    fieldName === 'review' ? styles.multiInput : styles.input,
    formik.touched[fieldName] && formik.errors[fieldName] 
      ? { borderColor: theme.colors.error} 
      : { borderColor: theme.colors.textSecondary}
  ]

  return (
    <View style={styles.container}>
      <TextInput
        style={getInputStyle('repositoryOwnerName')}
        placeholder='Repository owner name'
        value={formik.values.repositoryOwnerName}
        onChangeText={formik.handleChange('repositoryOwnerName')}
        autoCapitalize='none'
        autoCorrect={false}
      />
      {formik.touched.repositoryOwnerName && formik.errors.repositoryOwnerName && (
        <Text style={{ color: 'red', marginLeft: 10}}>{formik.errors.repositoryOwnerName}</Text>
      )}

      <TextInput
        style={getInputStyle('repositoryName')}
        placeholder='Repository name'
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        autoCapitalize='none'
        autoCorrect={false}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{ color: 'red', marginLeft: 10}}>{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        style={getInputStyle('rating')}
        placeholder='Rating value between 0 and 100'
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: 'red', marginLeft: 10}}>{formik.errors.rating}</Text>
      )}

      <TextInput
        style={getInputStyle('review')}
        placeholder='Review'
        value={formik.values.review}
        onChangeText={formik.handleChange('review')}
        autoCapitalize='none'
        multiline={true}
      />
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text fontWeight="bold" style={{color: 'white'}}>Create a review</Text>
      </Pressable>
    </View>
  );
}


export default ReviewForm;