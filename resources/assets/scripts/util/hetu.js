function valid(hetu) {
  // not a string
  if (typeof hetu !== 'string' && !(hetu instanceof String)) {
    return false
  }

  //check regex
  if(/^(\d{2})(\d{2})(\d{2})([Aa\-+])(\d{3})([0123456789ABCDEFHJKLMNPRSTUVWXYabcdefhjklmnprstuvwxy])$/.test(hetu) === false) {
    return false;
  }

  // wrong length
  if (hetu.length !== 11) {
    return false;
  }

  // validate century
  let validCenturies = ['-', '+', 'a'];
  if (validCenturies.indexOf(hetu.substr(6, 1).toLowerCase()) === -1) {
    return false;
  }

  // check digit
  let checkDigits = '0123456789abcdefhjklmnprstuvwxy';
  let checkNumber = Number(hetu.substr(0, 6) + hetu.substr(7, 3)) % 31;
  let calculatedCheckDigit = checkDigits.substr(checkNumber, 1);
  let checkDigit = hetu.substr(10, 1).toLowerCase();
  if (checkDigit !== calculatedCheckDigit) {
    return false
  }

  return true
}

function gender(hetu) {
  if (!valid(hetu)) {
    return false;
  }

  let gender = 'male';
  let genderCheckvalue = Number(hetu.substr(7, 3));
  if (genderCheckvalue % 2 === 0) {
    gender = 'female'
  }

  return gender;
}

function age(hetu) {
  if (!valid(hetu)) {
    return false;
  }

  let centuries = {
    '+': 1800,
    '-': 1900,
    'a': 2000,
  };
  let centuryCharacter = hetu.substr(6, 1);
  let century = centuries[centuryCharacter];
  let birthYear = century + Number(hetu.substr(4,2));
  let ageString = String(birthYear) + '-' + hetu.substr(2,2) + '-' + hetu.substr(0,2);
  let age = getAge(ageString);

  // additional validity check
  if (age < 0) {
    return false;
  }

  return age;
}

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export default {
  valid: valid,
  gender: gender,
  age: age,
};
