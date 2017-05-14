import { abs, currency } from './index'

it('create absolute value for amount', () => {
  let mock = {
    amount: -5,
  }
  expect(abs(mock).amount).toEqual(5)

  mock.amount = 4
  expect(abs(mock).amount).toEqual(4)
})

it('create readable currency value', () => {
  expect(currency(5)).toEqual('5,00 €')
  expect(currency(5000)).toEqual('5 000,00 €')
  expect(currency(0.1)).toEqual('0,10 €')
})
