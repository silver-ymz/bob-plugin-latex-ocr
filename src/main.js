function supportLanguages() {
  return ['auto'];
}

function ocr(query, completion) {
  const image = query.image;
  const postUrl = 'https://texocr.azurewebsites.net/predict/'
  let res = $http.post({
    url: postUrl,
    header: {
      'Content-Type': 'multipart/form-data',
    },
    files: [{
      data: image,
      name: "file",
      filename: "bob.png",
      'content-type': "image/png"
    }]
  });
  res
    .then((resp) => completion({
      result: {
        texts: [{ text: resp?.data }],
      }
    }))
    .catch((error) => {
      $log.error(JSON.stringify(error));
      completion({
        error: {
          type: 'api',
          message: '插件出错',
          detail: error,
        }
      });
    });
}

exports.supportLanguages = supportLanguages;
exports.ocr = ocr;