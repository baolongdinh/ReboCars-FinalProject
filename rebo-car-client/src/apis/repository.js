import axios from "axios";

const baseDomain = "http://localhost:3000/";
const baseURL = `${baseDomain}api/`; // or `${baseDomain}/api/v1`

const instance = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
  withCredentials: false,
  params: {},
});

function getLocalAccessToken() {
  return localStorage.getItem("accessToken");
}

function getLocalRefreshToken() {
  return localStorage.getItem("refreshToken");
}

async function getNewAccessTokenAndRefreshTokenByRefreshToken() {
  try {
    const result = await instance.post("/auth/refreshToken", {
      refreshToken: await getLocalRefreshToken(),
    });

    if (result.data.success) {
      return result.data.metadata.payload;
    }
  } catch (error) {
    console.error(error);
  }
}

instance.interceptors.request.use(
  // Do something before request is sent
  async function (config) {
    const accessToken = await getLocalAccessToken();
    if (accessToken) {
      instance.defaults.headers.common["authToken"] = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  async (err) => {
    console.log("errorrrrrrrrr");
    const config = err?.config;

    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !config?._retry) {
        config._retry = true;

        try {
          const payload =
            await getNewAccessTokenAndRefreshTokenByRefreshToken();
          console.log("get new access token and refresh token");
          const { newAccessToken, newRefreshToken } = payload;

          localStorage.setItem("accessToken", "Bearer " + newAccessToken);
          localStorage.setItem("refreshToken", "Bearer " + newRefreshToken);

          config.headers["authToken"] = "Bearer " + newAccessToken;

          return instance(config);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }

          return Promise.reject(_error);
        }
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
