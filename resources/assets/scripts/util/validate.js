import ApplicationFormData from '../vue/ApplicationFormData.js'
import Hetu from './hetu.js';
import IBAN from 'iban';
import FinnishBusinessIds from 'finnish-business-ids';

let validationText = ApplicationFormData.text.validationInfo;
let validReturn = {
  valid: true,
  msg: null,
};

function filled(value) {
  return value !== null && value !== '';
}

// true if value contains only digits
function digitsOnly(value) {
    return /^\d+$/.test(value);
}

// hetu
function arHetu(hetu) {
  let ageMin = 20;
  let ageMax = 75;

  if (!Hetu.valid(hetu)) {
    return {
      valid: false,
      msg: validationText.hetu,
    }
  }

  let age = Hetu.age(hetu);
  if (age < ageMin || age > ageMax) {
    return {
      valid: false,
      msg: validationText.hetuAge,
    }
  }

  return validReturn;
}

// postal number
function arPostalNumber(value) {
  let validLength = 5;

  if (value.length !== validLength) {
    return {
      valid: false,
      msg: validationText.postalNumberLength,
    }
  }

  return validReturn;
}

// phone
function arPhone(value) {
  let max = 12;
  let min = 5;

  if (value.length > max || value.length < min) {
    return {
      valid: false,
      msg: validationText.phoneLength,
    }
  }

  return validReturn;
}

// email
// this is a very loose check that should catch most of the errors while invalidating zero valid emails
function arEmail(value) {
  let re = /\S+@\S+\.\S+/;
  if (!re.test(value)) {
    return {
      valid: false,
      msg: validationText.email,
    }
  }

  return validReturn;
}

// iban
function arIban(value) {
  if (!IBAN.isValid(value)) {
    return {
      valid: false,
      msg: validationText.iban,
    }
  }

  return validReturn;
}

// gross income
function arGrossIncome(value) {
  let min = 100;
  let max = 20000;
  value = Number(value);

  if (value < min) {
    return {
      valid: false,
      msg: validationText.grossIncomeMin,
    }
  }

  if (value > max) {
    return {
      valid: false,
      msg: validationText.grossIncomeMax,
    }
  }

  return validReturn;
}

// net income
function arNetIncome(value, grossIncome) {
  let min = 100;
  value = Number(value);
  grossIncome = Number(grossIncome);

  if (value < min) {
    return {
      valid: false,
      msg: validationText.netIncomeMin,
    }
  }

  if (value > grossIncome) {
    return {
      valid: false,
      msg: validationText.netIncomeAboveGrossIncome,
    }
  }

  return validReturn;
}

// rent
function arRent(value) {
  if (!digitsOnly(value)) {
    return {
      valid: false,
      msg: validationText.rent,
    }
  }

  return validReturn;
}

// business id
function arBusinessId(value) {
  if (!FinnishBusinessIds.isValidBusinessId(value)) {
    return {
      valid: false,
      msg: validationText.businessId,
    }
  }

  return validReturn;
}

export default {
  filled: filled,
  arHetu: arHetu,
  arPostalNumber: arPostalNumber,
  arPhone: arPhone,
  arEmail: arEmail,
  arIban: arIban,
  arGrossIncome: arGrossIncome,
  arNetIncome: arNetIncome,
  arRent: arRent,
  arBusinessId: arBusinessId,

};
