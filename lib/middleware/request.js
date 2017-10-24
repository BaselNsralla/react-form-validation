

function  makeRequest (url, json, cb) {
  fetch(url, {
    headers : {
      'content-type': 'application/json'
    },
    method: "post",
    body: json
  }).then((data)=>{
    cb();
  });
}
