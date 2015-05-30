$(function() {
  var alphabetIndexes = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
      numericIndexes  = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57],
      numpadNumericIndexes = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105],
      doNotPrintCodes = [35, 36, 37, 38, 39, 40, 45],
      ignoredCodes    = [9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 91, 92, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 144, 145];

  function inverseCharacter(char, capitalize) {
    if (isAlpha(char)) {
      var inverseChar = String.fromCharCode(alphabetIndexes[alphabetIndexes.length - alphabetIndexes.indexOf(char) - 1]);

      if (capitalize) {
        inverseChar = inverseChar.toUpperCase();
      } else {
        inverseChar = inverseChar.toLowerCase();
      }

      return inverseChar;
    }

    if (isNumeric(char) && capitalize) {
      return String.fromCharCode(numericIndexes[numericIndexes.length - numericIndexes.indexOf(char) - 1]);
    }

    return undefined;
  }

  function isAlpha(char) {
    return (alphabetIndexes.indexOf(char) >= 0);
  }

  function isNumeric(char) {
    return (numericIndexes.indexOf(char) >= 0);
  }

  function isIgnoredKey(char) {
    return (ignoredCodes.indexOf(char) >= 0);
  }

  function isKeyWhichIsNotPrinted(char) {
    return (doNotPrintCodes.indexOf(char) >= 0);
  }

  function reinvertString() {
    var $output = $('#output'),
        $input = $('form input'),
        string = $input.val(),
        newString = '';

    $output.val('');


    for (var i = 0; i < string.length; i++) {
      var character = string[i],
          charIsCapitalized = false;

      if (character.match(/[A-Za-z]/)) {
        if (character.toUpperCase() === character) {
          charIsCapitalized = true;
        } else {
          charIsCapitalized = false;
        }

        character = character.toUpperCase();
      }

      var inverseChar = inverseCharacter(character.charCodeAt(), !charIsCapitalized);
      if (inverseChar) {
        newString += inverseChar;
      } else {
        newString += character;
      }
    }

    $output.text(newString);
  }

  $('form input').on('keyup', function(e) {
    var inverseChar = inverseCharacter(e.which, !e.shiftKey),
        $output = $('#output');

    if (isIgnoredKey(e.which)) {
      e.preventDefault();
      return;
    }

    if (isKeyWhichIsNotPrinted(e.which)) {
      return;
    }

    reinvertString();
  });

  $('.reset').on('click', function(e) {
    $('form').get(0).reset();
    $('#output').text('');
  });
});
