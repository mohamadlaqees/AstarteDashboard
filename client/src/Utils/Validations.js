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

export const addExperienceSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  duration: yup.number().required("Duration is required"),
  rating: yup
    .number()
    .required("Rating is required ")
    .min(1, "Rating must be at least 1"),
  itinerary: yup
    .array()
    .of(
      yup.object().shape({
        milestoneName: yup.string().required("Milestone Name is required"),
        location: yup.string().required("Location is required"),
      })
    )
    .min(1, "At least one itinerary item is required"),
});

//Projects
export const addOrUpdateProjectSchema = yup.object().shape({
  name: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  location: yup.string().required("Location is required"),
  startingPoint: yup.string().required("StartingPoint is required"),
});
