const endPointEncrypt = 'http://localhost:8000/server.php'
const editorCode = document.getElementById('editor');

function jobSendData() {
  const editorCodeContent = editorCode.value.trim();

  const oldCodeFormat = localStorage.getItem('plantuml_juanvladimir13') || '';
  if ( editorCodeContent !== '' && oldCodeFormat !== editorCodeContent) {
    localStorage.setItem('plantuml_juanvladimir13', editorCodeContent)

    const codeFormat = `@startuml\n${editorCodeContent}\n@enduml`;
    const dataParamsValues = new URLSearchParams();
    dataParamsValues.append('m', codeFormat);

    fetch(endPointEncrypt, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: dataParamsValues
    })
      .then(data => data.text())
      .then(dataUrlEncoded => {
        fetch(dataUrlEncoded)
          .then((data) => {
            if (data.status === 400) {
              return new Promise(
                resolve => ''
              );
            }
            return data.text()
          })
          .then(svgContent => {

            const blob = new Blob([svgContent], {type: 'image/svg+xml'});
            const blobUrl = URL.createObjectURL(blob);
            const img = new Image();
            img.src = blobUrl;
            document.getElementById('image').innerHTML = '';
            document.getElementById('image').appendChild(img);
          })
      })
  }

  setTimeout(jobSendData, 3000);
}

document.addEventListener('DOMContentLoaded', ()=>{
  jobSendData();
})