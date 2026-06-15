const generateButton = document.getElementById('generate_signature');
const copyButton = document.getElementById('copy_button');

var fields = new Map([
  ["full_name", ''], 
  ["pronouns", ''], 
  ["job_title", ''],
  ["department", ''],
  ["department_website", ''],
  ["unit", ''],
  ["unit_website", ''],
  ["street_address", '516 High Street'],  
  ["city", 'Bellingham'],
  ["state", 'WA'],
  ["zip_code", '98225'],
  ["mail_stop", ''],
  ["email", ''],
  ["phone_one", '360-650-'],
  ["phone_two", ''],
  ["teams_id", '']
]);

for (let [key] of fields) {      
  if(localStorage.getItem(key)){
    fields.set(key, localStorage.getItem(key));
  }     
  document.getElementsByName(key)[0].value = fields.get(key);     
} 

addPunctuation();

if(generateButton) {
  generateButton.onclick = function() {    
    for (let [key, value] of fields) {        
      fields.set(key, document.getElementsByName(key)[0].value);
      localStorage.setItem(key, document.getElementsByName(key)[0].value); 
    }  
    
    for (let [key, value] of fields) {    
      switch(key) {
        case "department":
        document.getElementById(key).innerHTML = !fields.get("department_website") ? value : `<a href="${fields.get("department_website")}">${value}</a>`;
        break;
        case "unit":
        document.getElementById(key).innerHTML = !fields.get("unit_website") ? value : `<a href="${fields.get("unit_website")}">${value}</a>`;
        break;
        case "email":
        case "phone_one":
        case "phone_two":
        const link_type = (key == "email") ? "mailto" : "tel";
        document.getElementById(key).innerHTML = `<a href="${link_type}:${value}">${value}</a></span>`;
        break;     
        case "teams_id":
        document.getElementById(key).innerHTML = value ? `<a href="https://teams.microsoft.com/l/chat/0/0?users=${value}@wwu.edu">Message me on Teams</a>` : '';
        break;  
        default:
        if(document.getElementById(key)) { document.getElementById(key).innerText = value; }
        break;
      }      
    }  
    addPunctuation();    
  }
}

if (copyButton) {
  copyButton.onclick = function(){
    var html = document.getElementById('email_signature').innerHTML;
    copyToClip(html).then(function(){
      copyButton.innerText = 'Signature copied!';
    }).catch(function(){
      copyButton.innerText = 'Copy failed';
    });
  };
}

function copyToClip(str) {
  if (navigator.clipboard && window.ClipboardItem) {
    try {
      var blobHtml = new Blob([str], { type: 'text/html' });
      var blobText = new Blob([str], { type: 'text/plain' });
      var item = new ClipboardItem({ 'text/html': blobHtml, 'text/plain': blobText });
      return navigator.clipboard.write([item]);
    } catch (e) {
      return navigator.clipboard.writeText(str);
    }
  } else if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(str);
  }
  
  return Promise.reject(new Error('Clipboard API not available'));
}

function addPunctuation() {  
  const old_punctuation = document.querySelectorAll(".wwu-sig-punct")
  for (let i = 0; i < old_punctuation.length; i++) {
    old_punctuation[i].remove();
  }
  
  const add_comma = ["full_name", "street_address", "state"]
  const add_bar = ["mail_stop", "phone_one", "phone_two", "teams_id"]
  
  add_comma.forEach(function(item){
    const span = document.createElement("span");
    span.classList.add("wwu-sig-punct");
    span.innerText = ", ";
    if(document.getElementById(item).innerText && document.getElementById(item).nextElementSibling.innerText) {
      document.getElementById(item).after(span);
    } 
  });

  add_bar.forEach(function(item){
    const span = document.createElement("span");
    span.classList.add("wwu-sig-punct");
    span.setAttribute("aria-hidden", true);
    span.innerText = " | ";
    if(document.getElementById(item).innerText && document.getElementById(item).previousElementSibling.innerText) {
      document.getElementById(item).before(span);
    } 
  });
}
