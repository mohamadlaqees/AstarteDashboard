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

//Experience
export const addExperienceSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  duration: yup.number().required("Duration is required"),
  rating: yup
    .number()
    .required("Rating is required ")
    .min(1, "Rating must be at least 1"),
  itinerary: yup.array().of(
    yup.object().shape({
      milestoneName: yup.string().required("Milestone Name is required"),
      location: yup.string().required("Location is required"),
    })
  ),
});

//Projects
export const addOrUpdateProjectSchema = yup.object().shape({
  name: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  location: yup.string().required("Location is required"),
  startingPoint: yup.string().required("StartingPoint is required"),
});

//Impact funds
export const addFundSchema = yup.object().shape({
  project: yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    location: yup.string().required("Location is required"),
    startingPoint: yup.string().required("StartingPoint is required"),
  }),
  totalAmount: yup.number().required("TotalAmount is required"),
  allocatedAmount: yup.number().required("AllocatedAmount is required"),
  donors: yup.array().of(
    yup.object().shape({
      donation: yup
        .number()
        .required("Donation is required")
        .typeError(
          ({ value }) =>
            `Donation must be a 'number' type, but the final value was: '${value}' (cast from the value '${
              value || ""
            }').`
        ),
      type: yup.string().required("Type is required"),
    })
  ),
});
