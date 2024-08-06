import * as yup from 'yup';

export const userProfileSchema = yup.object().shape({
  imageUrl: yup.string().required('Avatar is required'),  
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
});
