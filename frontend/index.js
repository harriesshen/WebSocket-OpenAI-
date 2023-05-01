let ws = new WebSocket("ws://localhost:3000");

ws.onopen = () => {
  console.log("open connection");
};

ws.onclose = () => {
  console.log("close connection");
};

ws.onmessage = (MsgData) => {
  const { data } = MsgData;
  console.log("訊息", data);
  //訊息為BLOB型態，解析訊息
  // if (e.data instanceof Blob) {
  //   let reader = new FileReader();
  //   reader.readAsText(e.data, "utf-8");
  //   reader.onload = (e) => {
  //     console.log("訊息", JSON.stringify(reader.result));
  //   };
  // }
  //接取webSocket所傳回的訊息放入畫面中(content)
  const contentUL = document.getElementById("contentUL");
  let message =
    sessionStorage.getItem("msg") != null
      ? `${sessionStorage.getItem("msg")}<li>${data}</li>`
      : `<li>${data}</li>`;
  sessionStorage.setItem("msg", message);
  contentUL.innerHTML = message;
};

//將Input輸入的msg傳送回後端
const input = document.getElementById("InputText");
input.addEventListener("keyup", (e) => {
  setTimeout(() => {
    if (e.code == "Enter") {
      // key:"Enter" , code:"Enter" keyCode:13

      SendMessage(e.target.value);
      e.target.value = "";
    }
  }, 500);
});
const SendMessage = (msg) => {
  ws.send(msg);
};
//刷新或離開 清除sessionstorage
window.onbeforeunload = (e) => {
  sessionStorage.clear();
};
