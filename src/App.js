document.getElementById('loadFileButton').addEventListener('click', function() {
  // Extract URL
  let fileUrl = document.getElementById('fileUrl').value;

  // Raw URL
  fileUrl = convertToRawUrl(fileUrl);

  // Fetch the file 
  fetch(fileUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error('Not Found ' + response.statusText);
          }
          return response.text();
      })
      .then(data => {
          // Display the file content
          document.getElementById('fileContent').textContent = data;
      })
      .catch(error => {
          console.error('There has been an error :', error);
          document.getElementById('fileContent').textContent = 'Error loading file: ' + error.message;
      });
});

/**
* Standard Url
* @param {string} url 
* @returns {string} 
*/
function convertToRawUrl(url) {
  const regex = /https:\/\/github\.com\/(.*)\/blob\/(.*)/;
  const rawUrl = url.replace(regex, 'https://raw.githubusercontent.com/$1/$2');
  return rawUrl;
}
