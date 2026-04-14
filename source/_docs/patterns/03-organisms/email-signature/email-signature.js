var generateButton = document.getElementById('generate_signature');
var copyButton = document.getElementById('copy_button');

if (generateButton) {
  generateButton.onclick = function() {
    function getVal(id) {
      var el = document.getElementById(id);
      return (el && el.value) ? el.value : '';
    }

    var full_name = getVal('full_name');
    var pronouns = getVal('pronouns');
    var job_title = getVal('job_title');
    var department = getVal('department');
    var department_website = getVal('department_website');
    var unit = getVal('unit');
    var unit_website = getVal('unit_website');
    var street_address = getVal('street_address');
    var city = getVal('city');
    var zip_code = getVal('zip_code');
    var mail_stop = getVal('mail_stop');
    var email = getVal('email');
    var phone_one = getVal('phone_one');
    var phone_two = getVal('phone_two');
    var teams_id = getVal('teams_id');

    var includePronounLinkEl = document.getElementById('include_pronoun_link');
    var includePronounLink = includePronounLinkEl && includePronounLinkEl.checked;

    if (includePronounLink) {
      pronouns = pronouns ? ' <span aria-hidden="true">|</span> <a href="https://pronouns.org/">' + pronouns + '</a>' : '';
    } else {
      pronouns = pronouns ? ' <span aria-hidden="true">|</span> ' + pronouns : '';
    }

    document.getElementById('field_full_name').innerText = full_name;
    document.getElementById('field_pronouns').innerHTML = pronouns;
    document.getElementById('field_job_title').innerText = job_title;
    document.getElementById('field_department').innerText = department;
    document.getElementById('field_unit').innerText = unit;
    document.getElementById('field_street_address').innerText = street_address;
    document.getElementById('field_city').innerText = city;
    document.getElementById('field_zip_code').innerText = zip_code;
    document.getElementById('field_email').innerHTML = '<a href="mailto:' + email + '">' + email + '</a>';

    if(phone_one) { document.getElementById('field_phone_one').innerHTML = ' <span aria-hidden="true">|</span> <a href="tel:' + phone_one + '">' + phone_one + '</a>' }
    else { document.getElementById('field_phone_one').innerHTML= '' }
    if(phone_two) { document.getElementById('field_phone_two').innerHTML = ' <span aria-hidden="true">|</span> <a href="tel:' + phone_two + '">' + phone_two + '</a>' }
    else { document.getElementById('field_phone_two').innerHTML= '' }

    if(teams_id) { document.getElementById('field_teams_id').innerHTML = ' <span aria-hidden="true">|</span> <a href="https://teams.microsoft.com/l/chat/0/0?users=' + teams_id + '@wwu.edu">Message me on Teams</a>' }
    else { document.getElementById('field_teams_id').innerHTML= '' }

    if(mail_stop) { document.getElementById('field_mail_stop').innerHTML = ' <span aria-hidden="true">|</span> MS' + mail_stop }
    else { document.getElementById('field_mail_stop').innerText= '' }

    if(department_website) { document.getElementById('field_department').innerHTML = '<a href="' + department_website + '">' + department + '</a>'; }
    if(unit_website) { document.getElementById('field_unit').innerHTML = '<a href="' + unit_website + '">' + unit + '</a>'; }

    copyButton.innerText ='Copy to Clipboard';
    copyButton.focus();
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
