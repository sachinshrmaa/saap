const logOutUser = () => {
  localStorage.removeItem("token");
  return true;
};

export default logOutUser;
