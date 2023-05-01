const url = "http://127.0.0.1:3000"; //需要連結至後端port號

let response = [];

const ajaxGetAPI = () => {
  $.ajax({
    url: `${url}/api/data`,
    method: "GET",
    success: (res) => {
      console.log("success", res);
      response = res;
    },
    error: (res) => {
      console.log("error", res);
    },
  });
};

const fetchGetAPI = () => {
  fetch(`${url}/api/data`)
    .then((res) => res.json())
    .then((data) => (response = data))
    .catch((error) => console.log(error));
};

const xmlHttpRequest = () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `${url}/api/data`, true);
  xhr.onload = () => {
    if (xhr.status == 200) {
      const data = JSON.parse(xhr.responseText);
      response = data;
      console.log(data);
    } else {
      console.error("Error retrieving data");
    }
  };
  xhr.send();
};
