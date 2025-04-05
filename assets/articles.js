fetch('https://edu.abjad.eu.org')
  .then(response => response.text())
  .then(data => {
    document.getElementById('container').innerHTML = data;
  });
