export default function (data, url, callbackSuccess, callbackFail) {
  let xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {

      let responseData = null;
      if (xhr.responseText) {
        try {
          responseData = JSON.parse(xhr.responseText);
        }
        catch (e) {
          responseData = {error: 'bad response'};
        }
      }

      if (xhr.status === 200) {
        callbackSuccess(responseData);
      }
      else {
        callbackFail(responseData);
      }
    }
  };

  xhr.send(JSON.stringify(data));
}