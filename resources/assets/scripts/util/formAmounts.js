function formAmounts() {
  let amountsArray = [];

  for (let i = 500; i < 3000; i += 100) {
    amountsArray.push({label: `${i.toString()} euroa`, value: i});
  }

  for (let i = 3000; i < 10000; i += 500) {
    amountsArray.push({label: `${i.toString()} euroa`, value: i});
  }

  for (let i = 10000; i < 51000; i += 1000) {
    amountsArray.push({label: `${i.toString()} euroa`, value: i});
  }

  return amountsArray;
}

function formYears(min = 2, max = 16) {
  let yearsArray = [{label: `1 vuosi`, value: 1}];

  for (let i = min; i < max; i++) {
    yearsArray.push({label: `${i} vuotta`, value: i});
  }
  return yearsArray;
}

export const amounts = formAmounts();
export const years = formYears();
