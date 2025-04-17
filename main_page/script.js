let reportText = "";
let annotations = [];

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    reportText = data[0].Report;
    document.getElementById('reportDisplay').innerText = reportText;
  });

function addLabel() {
  const selection = window.getSelection();
  const selectedText = selection.toString();
  const start = reportText.indexOf(selectedText);
  const end = start + selectedText.length;

  if (start === -1) {
    alert("Please select a valid phrase in the report.");
    return;
  }

  const labelType = document.getElementById("labelType").value;
  annotations.push({
    entity_value: selectedText,
    entity_type: labelType,
    start_position: start,
    end_position: end
  });

  document.getElementById("output").innerText = JSON.stringify(annotations, null, 2);
}

function downloadJSON() {
  const blob = new Blob([JSON.stringify(annotations, null, 2)], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'annotations.json';
  a.click();
  URL.revokeObjectURL(url);
}
