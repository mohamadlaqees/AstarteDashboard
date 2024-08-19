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

//Login
export const logInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup.string().min(8).required("Password is required"),
});

//Experience
export const addOrUpdateExperienceSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  status: yup.string().required("Status is required"),
  bookedSeats: yup
    .number()
    .required("BookedSeats is required ")
    .min(1, "BookedSeats must be at least 1"),
  description: yup.string().required("Description is required"),
  duration: yup
    .mixed()
    .test(
      "is-srting-or-number",
      "Duration must be a string or number",
      (value) => typeof value === "string" || typeof value === "number"
    )
    .required()
    .test(
      "is-not-empty",
      "Duration is required",
      (value) => value !== "" && value !== undefined && value !== null
    ),
  rating: yup
    .number()
    .required("Rating is required ")
    .min(1, "Rating must be at least 1"),
  registrationStartDate: yup.date().required(),
  registrationEndDate: yup.date().required(),
  itinerary: yup.array().of(
    yup.object().shape({
      milestoneName: yup.string().required("Milestone Name is required"),
      location: yup.string().required("Location is required"),
    })
  ),
  includes: yup.array().of(
    yup.object().shape({
      description: yup.string().required("Description is required"),
      icon: yup.string().required("Icon is required"),
    })
  ),
  media: yup.array().of(
    yup.object().shape({
      image: yup.string().required("Image is required"),
    })
  ),
});

//Projects
export const addOrUpdateProjectSchema = yup.object().shape({
  name: yup.string().required("Title is required"),
  isEducational: yup.string().required("IsEducational is required"),
  description: yup.string().required("Description is required"),
  location: yup.string().required("Location is required"),
  startingPoint: yup.string().required("StartingPoint is required"),
  date: yup.date().required(),
  image: yup.string().required("Image is required"),
});

//Impact funds
export const addOrUpdateFundSchema = yup.object().shape({
  project: yup.string().required("Project is required"),
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
    })
  ),
});
