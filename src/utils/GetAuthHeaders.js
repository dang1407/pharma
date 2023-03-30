export const getAuthHeaders = (contentType = "application/json") => {
  const token = localStorage.getItem("token");
  if (!token) {
    return (window.location.href = "/account/login");
  }
  return {
    "Content-Type": contentType,
    Authorization: "Bearer " + token,
  };
};
