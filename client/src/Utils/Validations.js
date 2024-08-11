import * as yup from "yup";

export const userProfileSchema = yup.object().shape({
  imageUrl: yup.string().required("Avatar is required"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

export const addExperiencSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  duration: yup.number().required("Duration is required"),
  milestoneName: yup.string().required("MilestoneName is required"),
  location: yup.string().required("Location is required"),
});
