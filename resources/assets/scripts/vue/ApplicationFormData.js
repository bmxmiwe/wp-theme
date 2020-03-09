import camelCaseKeys from 'camelcase-keys';
import {amounts, years} from '../util/formAmounts'

let employmentFixedDurationInputGroup = [
  'occupationCategory',
  'occupationName',
  'startMonth',
  'fixedDurationEndMonth',
  'employer',
  'grossIncome',
  'netIncome',
];

let extraPersonEmploymentFixedDurationInputGroup = [
  'startMonth',
  'fixedDurationEndMonth',
  'employer',
  'grossIncome',
  'netIncome',
];

let extraPersonEmploymentDefault = [
  'startMonth',
  'employer',
  'grossIncome',
  'netIncome',
];

let phonePlaceholder = '358 00 000 0000';

let el = document.getElementById('application-form');
if (el) {
  var apr = el.getAttribute('data-apr');
  var date = el.getAttribute('data-date');
  var imageUrl = el.getAttribute('data-image');
  var termsUrl = el.getAttribute('data-terms-link');
  var consentToDisclosureUrl = el.getAttribute('data-consent-to-disclosure-link');
  var rejectedLink = el.getAttribute('data-rejected-link');
  var errorLink = el.getAttribute('data-error-link');
  var textObj = camelCaseKeys(JSON.parse(el.getAttribute('data-text')));

  /* var gaClientId;
  window.ga(function(tracker) {
    gaClientId = tracker.get('clientId');
  });
  */
}

let fields = {
  loanAmounts: {
    label: 'Valitse lainasumma',
    placeholder: "",
    options: amounts,
  },
  loanTime: {
    label: 'Valitse laina-aika',
    placeholder: "",
    options: years,
  },
  socialSecurityNumber: {
    type: 'TextInput',
    label: 'Henkilötunnus',
    placeholder: '000000-123X',
    validationId: 'hetu',
  },

  firstName: {
    type: 'TextInput',
    label: 'Etunimi',
    placeholder: 'Matti',
  },
  lastName: {
    type: 'TextInput',
    label: 'Sukunimi',
    placeholder: 'Meikäläinen',
  },
  accountNumber: {
    type: 'TextInput',
    label: 'Tilinumero',
    placeholder: 'IBAN',
    validationId: 'iban',
  },
  phone: {
    type: 'TextInput',
    inputType: 'number',
    label: 'Puhelinnumero',
    placeholder: phonePlaceholder,
    validationId: 'phone',
  },
  employmentType: {
    type: 'Dropdown',
    label: 'Työsuhteen muoto',
    options: [
      {
        label: 'Vakituinen työsuhde',
        value: 1,
      },
      {
        label: 'Yrittäjä',
        value: 2,
      },
      {
        label: 'Freelancer',
        value: 6,
      },
      {
        label: 'Eläkeläinen',
        value: 7,
      },
      {
        label: 'Työtön',
        value: 8,
      },
      {
        label: 'Opiskelija',
        value: 9,
      },
      {
        label: 'Koeajalla',
        value: 10,
      },
      {
        label: 'Vanhempainloma',
        value: 13,
      },
      {
        label: 'Maanviljelijä',
        value: 14,
      },
      {
        label: 'Määräaikainen ts',
        value: 15,
      },
    ],
  },
  email: {
    type: 'TextInput',
    inputType: 'email',
    label: 'Sähköpostiosoite',
    placeholder: 'm.meikalainen@esimerkki.fi',
    validationId: 'email',
  },
  streetAddress: {
    type: 'TextInput',
    label: 'Katuosoite',
    placeholder: '',
  },
  postalNumber: {
    type: 'TextInput',
    inputType: 'number',
    label: 'Postinumero',
    placeholder: '12300',
    validationId: 'postalNumber',
  },
  postOffice: {
    type: 'TextInput',
    label: 'Postitoimipaikka',
    placeholder: 'Helsinki',
  },
  maritalStatus: {
    type: 'Dropdown',
    label: 'Siviilisääty',
    options: [
      'Naimisissa',
      'Avoliitto',
      'Naimaton',
      'Eronnut',
      'Leski',
    ],
  },
  children: {
    type: 'Dropdown',
    label: 'Lapsia taloudessa',
    options: [
      {
        label: 'Ei yhtään',
        value: 0,
      },
      {
        label: '1',
        value: 1,
      },
      {
        label: '2',
        value: 2,
      },
      {
        label: '3',
        value: 3,
      },
      {
        label: '4',
        value: 4,
      },
      {
        label: '5',
        value: 5,
      },
      {
        label: '6',
        value: 6,
      },
      {
        label: 'Enemmän kuin 6',
        value: 7,
      },
    ],
  },
  militaryService: {
    type: 'Toggle',
    label: 'Asevelvollisuus',
    slot: 'Suoritettu',
    checked: 'Suoritettu',
    unchecked: 'Ei',
  },
  extraPerson: {
    type: 'Toggle',
    slot: 'Haen yhteishakijan kanssa',
    checked: 'Kyllä',
    unchecked: 'Ei',
  },
  userAgreementVersion: {
    type: 'Toggle',
    slot: 'Minä hyväksyn Rahoituksen Yleiset Käyttäjäsopimuksen.',
    slotForExtraPerson: 'Minä ja minun rinnakkaishakijani hyväksymme Rahoituksen Yleiset  Käyttäjäsopimuksen.',
  },
  userAgreementUserTerms: {
    type: 'Toggle',
    slot: 'Minä hyväksyn Freedom Rahoituksen Yleiset ehdot.',
    slotForExtraPerson: 'Minä ja minun rinnakkaishakijani hyväksymme Freedom Rahoituksen Yleiset ehdot.',
  },
  hasLoans: {
    type: 'Toggle',
    slot: 'Minulla on lainoja / luottokortteja',
    checked: 'Kyllä',
    unchecked: 'Ei',
  },
  extraPersonHasLoans: {
    type: 'Toggle',
    slot: 'Yhteishakijalla on lainoja tai luottokortteja',
    checked: 'Kyllä',
    unchecked: 'Ei',
  },
  extraPersonSameAddress: {
    type: 'Toggle',
    slot: 'Yhteishakija asuu samassa osoitteessa',
    checked: 'Kyllä',
    unchecked: 'Ei',
  },
  employment: {
    type: 'Dropdown',
    label: 'Työsuhde',
    options: [
      'Vakituinen',
      'Määräaikainen',
      'Projektityöntekijä',
      'Yrittäjä',
      'Työtön',
      'Eläkeläinen',
      'Opiskelija',
    ],
  },
  education: {
    type: 'Dropdown',
    label: 'Koulutus',
    options: [
      {
        label: 'Peruskoulu',
        value: 'peruskoulu',
      },
      {
        label: 'Lukio',
        value: 'lukio',
      },
      {
        label: 'Ammattikoulu',
        value: 'ammattikoulu',
      },
      'Alempi korkeakoulututkinto',
      'Ylempi korkeakoulututkinto',
    ],
  },
  visa: {
    type: 'Toggle',
    slot: 'Visa',
  },
  mastercard: {
    type: 'Toggle',
    slot: 'Mastercard',
  },
  creditCardOther: {
    type: 'Toggle',
    slot: 'Muu luottokortti',
  },
  numberOfLoans: {
    type: 'Dropdown',
    label: 'Lainojen lukumäärä',
    options: [
      {
        value: 0,
        label: 'Ei yhtään',
      },
      {
        value: 1,
        label: '1',
      },
      {
        value: 2,
        label: '2',
      },
      {
        value: 3,
        label: '3',
      },
      {
        value: 4,
        label: '4',
      },
      {
        value: 5,
        label: '5',
      },
      {
        value: 6,
        label: '6',
      },
      {
        value: 7,
        label: '7',
      },
      {
        value: 8,
        label: '8',
      },
      {
        value: 9,
        label: '9',
      },
      {
        value: 10,
        label: '10',
      },
      {
        value: 11,
        label: '11 tai enemmän',
      },
    ],
  },
  acceptTerms: {
    type: 'Toggle',
    slotHtml: 'Olen tutustunut <a target="_blank" href="' + termsUrl + '">yleisiin ehtoihin ja palvelukuvaukseen</a>.',
  },
  consentToDisclosure: {
    type: 'Toggle',
    slotHtml: 'Suostumus <a target="_blank" href="' + consentToDisclosureUrl + '">tietojen luovutukseen</a>.',
  },
  employmentDetails: {
    occupationCategory: {
      type: 'Dropdown',
      label: 'Ammattiryhmä',
      options: [
        'Maatalousyrittäjä',
        'Yrittäjä',
        'Ylempi toimihenkilö',
        'Alempi toimihenkilö',
        'Työntekijä',
        'Muu',
      ],
    },
    startMonth: {
      type: 'Datepicker',
      label: 'Työsuhde alkanut',
      dateRestriction: 'past',
    },
    occupationName: {
      type: 'TextInput',
      label: 'Ammatti',
    },
    employer: {
      type: 'TextInput',
      label: 'Työnantaja',
    },
    grossIncome: {
      type: 'TextInput',
      inputType: 'number',
      label: 'Kuukausitulot ennen veroja',
      placeholder: '€',
      validationId: 'grossIncome',
    },
    netIncome: {
      type: 'TextInput',
      inputType: 'number',
      label: 'Kk-tulot verojen jälkeen',
      placeholder: '€',
      validationId: 'netIncome',
    },
    previousEmployer: {
      type: 'TextInput',
      label: 'Edellinen työnantaja',
    },
    previousEmployedSince: {
      type: 'Datepicker',
      label: 'Edellisen työsuhteen alkamisaika',
      dateRestriction: 'past',
    },
    previousEmployedTo: {
      type: 'Datepicker',
      label: 'Edellisen työsuhteen päättymisaika',
      dateRestriction: 'past',
    },
    fixedDurationEndMonth: {
      type: 'Datepicker',
      label: 'Määräaikaisen työsuhteen voimassaoloaika',
      dateRestriction: 'future',
    },
    companyName: {
      type: 'TextInput',
      label: 'Yrityksen Nimi',
    },
    businessId: {
      type: 'TextInput',
      label: 'Y-tunnus',
      validationId: 'businessId',
    },
    companyRegistrationDate: {
      type: 'Datepicker',
      label: 'Yrityksen rekisteröintipäivämäärä',
    },
    insuranceInstitution: {
      type: 'TextInput',
      label: 'Eläkelaitos',
    },
    retirementStartMonth: {
      type: 'Datepicker',
      label: 'Eläkkeen alkamispäivämäärä',
      dateRestriction: 'past',
    },
  },
  household: {
    householdType: {
      type: 'Dropdown',
      label: 'Talouden tyyppi',
      options: [
        {
          value: 1,
          label: 'Yhden hengen talous tai yksinhuoltaja',
        },
        {
          value: 2,
          label: 'Kaksi aikuista ja lapsi/lapsia',
        },
        {
          value: 3,
          label: 'Muu (kaksi aikuista ei lapsia yms.)',
        },
      ],
    },
    householdIncome: {
      type: 'Dropdown',
      label: 'Talouden kokonaistulo bruttona',
      options: [
        {
          value: 1,
          label: 'alle 24 000 €',
        },
        {
          value: 2,
          label: '24 000 - 30 000 €',
        },
        {
          value: 3,
          label: '30 000 - 37 000 €',
        },
        {
          value: 4,
          label: '37 000 - 48 500 €',
        },
        {
          value: 5,
          label: 'yli 48 500 €',
        },
      ],
    },
    residence: {
      type: 'Dropdown',
      label: 'Asumismuoto',
      options: [
        'Oma',
        'Asumisoikeus',
        'Vuokra',
        'Vanhempien luona',
      ],
    },
    apartmentType: {
      type: 'Dropdown',
      label: 'Asunnon tyyppi',
      options: [
        'Kerrostalo',
        'Rivitalo',
        'Omakotitalo',
        'Muu',
      ],
    },
    moveInMonth: {
      type: 'Datepicker',
      label: 'Muuttoajankohta asuntoon',
      dateRestriction: 'past',
    },
    rent: {
      type: 'TextInput',
      inputType: 'number',
      label: 'Vuokramenot',
      placeholder: 'Vuokramenot € / kk',
      validationId: 'rent',
    },
    holidayHome: {
      type: 'Toggle',
      label: 'Loma-asunto',
      slot: 'Omistan loma-asunnon',
    },
  },
  loanType: {
    type: 'Dropdown',
    label: null,
    placeholder: 'Valitse lainan tyyppi',
    options: [
      {
        value: 'Creditcard',
        label: 'Luottokortti',
      },
      {
        value: 'Mortgage',
        label: 'Asuntolaina',
      },
      {
        value: 'Student',
        label: 'Opintolaina',
      },
      {
        value: 'Car',
        label: 'Auto- tai venelaina',
      },
      {
        value: 'Other',
        label: 'Muu laina',
      },
    ],
  },
};

export default {
  state: {
    step: 1,
    loadingRequest: false,
    displayInvalidFields: false,
    sendFailed: false,
  },
  data: {
    tid: '',
    queryString: {},
    channel: 'LV',
    loanAmount: 10000,
    loanPeriod: 7,
    loanCombine: false,
    loanCombineAmount: 100,
    extraPerson: fields.extraPerson.unchecked,
    hasLoans: fields.hasLoans.unchecked,
    numberOfLoans: null,
    extraPersonNumberOfLoans: null,
    extraPersonHasLoans: fields.hasLoans.unchecked,
    ehdot: 0,
    tarkistus: 0,
    userAgreementVersion: 0,
    userAgreementUserTerms: 0,
    personInfo: {
      socialSecurityNumber: null,
      accountNumber: null,
      lastName: null,
      firstName: null,
      phone: null,
      email: null,
      employmentType: null,
      streetAddress: null,
      postalNumber: null,
      postOffice: null,
      maritalStatus: null,
      children: null,
      militaryService: fields.militaryService.unchecked,
    },
    personEmployment: {
      employment: null,
      education: null,
    },
    personEmploymentDetails: {
      occupationCategory: null,
      occupationName: null,
      startMonth: null,
      employer: null,
      grossIncome: null,
      netIncome: null,
      previousEmployer: null,
      previousEmployedSince: null,
      previousEmployedTo: null,

      // fixedDuration
      fixedDurationEndMonth: null,

      // enterpreneur
      companyName: null,
      businessId: null,
      companyRegistrationDate: null,

      // retired
      insuranceInstitution: null,
      retirementStartMonth: null,
    },
    household: {
      householdType: null,
      householdIncome: null,
      residence: null,
      apartmentType: null,
      holidayHome: 0,
      moveInMonth: null,
      rent: null,
    },
    creditCards: {
      visa: 0,
      mastercard: 0,
      creditCardOther: 0,
    },
    loans: [],
    extraPersonLoans: [],
    extraPersonInfo: {
      socialSecurityNumber: null,
      lastName: null,
      firstName: null,
      phone: null,
      email: null,
      streetAddress: null,
      postalNumber: null,
      postOffice: null,
      maritalStatus: null,
      extraPersonSameAddress: fields.extraPersonSameAddress.unchecked,
    },
    extraPersonEmployment: {
      employment: null,
      education: null,
    },
    extraPersonEmploymentDetails: {
      startMonth: null,
      employer: null,
      grossIncome: null,
      netIncome: null,

      // fixedDuration
      fixedDurationEndMonth: null,

      // enterpreneur
      companyName: null,
      businessId: null,
      companyRegistrationDate: null,

      // retired
      insuranceInstitution: null,
      retirementStartMonth: null,
    },
  },
  text: {
    ...textObj,
    monthlyPaymentHeading: 'Arvioitu kuukausierä*:',
    monthlyPaymentUnit: '€ / kk',
    monthlyPaymentExample: 'Lainaesimerkki: Todellinen vuosikorko on 6,17 %, kun lainasumma on 30 000 €, Takaisinmaksuaika 5 vuotta, Esimerkkikorko 6,00 %. Kokonaiskulut 34 799 €. Tarjottava laina-aika voi olla 1 - 15 vuoden välillä, lainasummat 500 - 70 000€, nimelliskorko 4,5% - 20% ja vuosittaiset lainakustannukset 0 – 150 €.',
    invalidEmploymentMessage: 'Valitettavasti lainaa hakeakseen hakijalla tulee olla säännölliset palkka- tai eläketulot.',
    headingExtraPerson: 'Yhteishakijan tiedot',
    headingCreditCards: 'Luottokortit',
    headingLoans: 'Lainat',
    headingExtraPersonLoans: 'Yhteishakijan lainat',
    fillAllFieldsNote: 'Täytä puuttuvat kentät.',
    acceptEverythingNote: 'Hyväksy ehdot ja suostumus tietojen luovutukseen.',
    invalidCombinedLoansTotalNote: 'Yhdistettyjen lainojen yhteenlaskettu summa ylittää lainasumman.',
    sendFailNote: 'Lomakkeen lähetys epäonnistui',
    successHeading: 'Lomake lähetetty onnistuneesti!',
    loans: {
      typeHeading: 'Lainan tyyppi',
      totalAmountHeading: 'Lainan saldo',
      monthlyAmountHeading: 'Kuukausierä',
      combineHeading: 'Yhdistä laina?',
      combineLabel: 'Yhdistä laina',
      totalAmountPlaceholder: 'Summa €',
      monthlyAmountPlaceholder: 'Kulut € / kk',
    },
    general: {
      currencySymbol: '€',
      selectPlaceholder: 'Valitse',
      loading: 'Ladataan...',
    },
    label: {
      loanAmount: 'Lainasumma',
      loanPeriod: 'Laina-aika',
      loanCombine: 'Haluaisin yhdistää lainoja',
      loanCombineAmount: 'Aion maksaa vanhoja lainoja pois',
    },
    validationInfo: {
      hetu: 'Varmista, että olet kirjoittanut henkilötunnuksesi oikein.',
      hetuAge: 'Hakijan täytyy olla iältään 20-75 -vuotias.',
      postalNumberLength: 'Postinumeron pituus on 5 numeroa.',
      phoneLength: 'Puhelinnumeron pituus on 5-12 merkkiä.',
      email: 'Sähköpostiosoite ei kelpaa.',
      iban: 'Varmista, että tilinumero (IBAN) on kirjoitettu oikein.',
      netIncomeMin: 'Nettotulojen on oltava ' +
        ' 100 euroa',
      grossIncomeMin: 'Bruttotulojen on oltava vähintään 100 euroa',
      grossIncomeMax: 'Suurin sallittu kuukausitulo on 20 000 euroa',
      netIncomeAboveGrossIncome: 'Nettotulojen on oltava vähemmän kuin bruttotulojen.',
      rent: 'Vuokran on oltava kokonaisluku.',
      businessId: 'Varmista, että olet kirjoittanut Y-tunnuksen oikein.',
    },
  },
  fields: fields,
  inputGroup: {
    personInfo: [
      'socialSecurityNumber',
      'firstName',
      'lastName',
      'accountNumber',
      'phone',
      'email',
      'employmentType',
      'streetAddress',
      'postalNumber',
      'postOffice',
      'maritalStatus',
      'children',
    ],
    employmentDetails: {
      'Vakituinen': [
        'occupationCategory',
        'occupationName',
        'startMonth',
        'employer',
        'grossIncome',
        'netIncome',
        'previousEmployer',
        'previousEmployedSince',
        'previousEmployedTo',
      ],
      'Määräaikainen': employmentFixedDurationInputGroup,
      'Projektityöntekijä': employmentFixedDurationInputGroup,
      'Yrittäjä': [
        'occupationCategory',
        'occupationName',
        'companyName',
        'businessId',
        'companyRegistrationDate',
        'grossIncome',
        'netIncome',
      ],
      'Työtön': [],
      'Eläkeläinen': [
        'insuranceInstitution',
        'retirementStartMonth',
        'grossIncome',
        'netIncome',
      ],
      'Opiskelija': [],
    },
    household: [
      'householdType',
      'householdIncome',
      'residence',
      'apartmentType',
      'moveInMonth',
      'holidayHome',
    ],
    creditCards: [
      'visa',
      'mastercard',
      'creditCardOther',
    ],
    extraPersonInfo: [
      'socialSecurityNumber',
      'lastName',
      'firstName',
      'phone',
      'email',
      'maritalStatus',
      'extraPersonSameAddress',
    ],
    extraPersonAddress: [
      'streetAddress',
      'postalNumber',
      'postOffice',
    ],
    extraPersonEmployment: [
      'employment',
      'education',
    ],
    extraPersonEmploymentDetails: {
      'Vakituinen': extraPersonEmploymentDefault,
      'Määräaikainen': extraPersonEmploymentFixedDurationInputGroup,
      'Projektityöntekijä': extraPersonEmploymentFixedDurationInputGroup,
      'Yrittäjä': [
        'companyName',
        'businessId',
        'companyRegistrationDate',
        'grossIncome',
        'netIncome',
      ],
      'Työtön': extraPersonEmploymentDefault,
      'Eläkeläinen': [
        'insuranceInstitution',
        'retirementStartMonth',
        'grossIncome',
        'netIncome',
      ],
      'Opiskelija': extraPersonEmploymentDefault,
    },
  },
  other: {
    apr: apr,
    apiUrl: 'https://wl.leadout.io/api/v1/loan/send',
    apiUrlRahamarkkinat: 'https://wl.leadout.io/api/v3/loan/send',
    date: date,
    imageUrl: imageUrl,
    rejectedLink: rejectedLink,
    errorLink: errorLink,
  },
}
