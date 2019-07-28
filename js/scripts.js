// Generate and show password.
$(document).ready(function() {
  $('.button2').click(function() {
    // Get the checkmarked character sets for the password.
    var characterSet = '';
    if (document.getElementById('cbox1').checked)
      characterSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (document.getElementById('cbox2').checked)
      characterSet += 'abcdefghijklmnopqrstuvwxyz';
    if (document.getElementById('cbox3').checked)
      characterSet += '0123456789';
    if (document.getElementById('cbox4').checked) {
      // Get the additional characters that are (non-space && not yet included)
      var extraChars = document.getElementById('additionalCharacters')
                               .value;
      for (const character of extraChars) {
        if (character !== ' ' && characterSet.indexOf(character) == -1) {
          characterSet += character;
        }
      }
    }


    // Generate passwords.
    const numPasswords = 10;
    var passwordLength = Number(document.getElementById('passwordLength')
                                        .value);
    var randomNums = new Uint32Array(passwordLength * numPasswords);
    window.crypto.getRandomValues(randomNums);
    var passwords = '';
    for (var j = 0; j < numPasswords; ++j) {
      for (var i = 0; i < passwordLength; ++i) {
        passwords += characterSet.charAt(randomNums[i + j * passwordLength] % characterSet.length);
      }
      passwords += '\n';
    }
    console.log(passwords);

    // Show the passwords.
    document.getElementById('result')
            .value = passwords;
  });
  $('.button2').click();
});
