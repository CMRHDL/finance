export const attributionId = recordset => ({
  ...recordset,
  attribution: recordset.attribution._id,
})
export const amount = recordset => {
  return {
    ...recordset,
    amount: recordset.attribution.isIncome
      ? recordset.amount
      : recordset.amount * -1,
  }
}

export const filters = {
  amountMax: amountMax => ({
    func: recordsetEntry => recordsetEntry.amount < amountMax,
    id: 'amountMax',
  }),
  amountMin: amountMin => ({
    func: recordsetEntry => recordsetEntry.amount > amountMin,
    id: 'amountMin',
  }),
  // dateMin: dateMin => ({
  //   func: recordsetEntry => recordsetEntry.date > dateMin,
  //   id: 'dateMin',
  // }),
  // dateMax: dateMax => ({
  //   func: recordsetEntry => recordsetEntry.date > dateMax,
  //   id: 'dateMax',
  // }),
  description: description => ({
    func: recordsetEntry => recordsetEntry.description.indexOf(description) > -1,
    id: 'description',
  }),
  code: code => ({
    func: recordsetEntry => (recordsetEntry.code + '').indexOf(code) > -1,
    id: 'code',
  }),
}
