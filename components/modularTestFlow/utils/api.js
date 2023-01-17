import { Platform } from "react-native";
// Some default API stuff
const apiHeaders = new Headers();
apiHeaders.append("Content-Type", "application/json");

const getData = {
  method: "GET",
  redirect: "follow",
};

const postData = {
  method: "POST",
  redirect: "follow",
};

const authInterceptor = async (apiKey, apiSecret) => {
  getData.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ApiKey: apiKey,
    ApiSecret: apiSecret,
    // Authorization: "Bearer " + (await store.getState().token),
  };

  postData.headers = {
    Accept: "application/json",
    ApiKey: apiKey,
    ApiSecret: apiSecret,
    "Content-Type": "application/json",
    // Authorization: "Bearer " + (await store.getState().token),
  };
};

const timeoutWrapper = (ms, promiseFunc) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      rej(new Error("10s timeout exceeded"));
    }, ms);

    promiseFunc.then(res, rej);
  });
};

// post picture
const apiPostPicture = async (
  apiUrl,
  base64Image,
  base64Image2,
  maskId,
  apiKey,
  apiSecret,
  callback
) => {
  postData.body = JSON.stringify({
    ImageBase64: base64Image,
    Image2Base64: base64Image2,
    // Image2Base64: TEST_IMAGE,
    MaskId: maskId,
    ClientId: apiKey,
    PlatformOS: Platform.OS,
    PlatformVersion: Platform.Version.toString(),
  });

  authInterceptor(apiKey, apiSecret)
    .then(() => {
      timeoutWrapper(10000, fetch(apiUrl, postData))
        .then((response) => response.json())
        .then((responseJson) => {
          callback(responseJson);
        })
        .catch((error) =>
          callback({ success: false, error: error.toString() })
        );
    })
    .catch((err) => console.log("*** error", err));
};

export { apiPostPicture };
