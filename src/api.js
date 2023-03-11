export const API_URL = "https://dogsapi.origamid.dev/json";

export const userLoginToken = (data) => {
  return {
    url: API_URL + "/jwt-auth/v1/token",
    options: {
      method: "POST",
      Headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  };
};
