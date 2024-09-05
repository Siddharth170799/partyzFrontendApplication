export const ValidateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email) ? "" : "Please enter a valid email address";
};

export const ValidateName = (name) => {
  const regex = /^[A-Za-z\s]+$/;

  return regex.test(name)
    ? ""
    : "Name must only contain alphabetic characters and spaces.";
};
export default ValidateName;

export const ValidateGuests = (guests) => {
  const regex = /^(?:[1-9][0-9]{0,2}|1000)$/;

  return regex.test(guests)
    ? ""
    : "Enter the Number of Guests in Number upto 1000";
};


export const ValidatePhoneNumber = (phonenumber) => {
    const regex = /^\d{10}$/;
  return regex.test(phonenumber) ? "" : "Phone number must be exactly 10 digits.";
  };
