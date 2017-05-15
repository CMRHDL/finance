import { filters } from './recordset.util'

const mock = [
  {
    amount: 100,
    description: 'Foo',
    code: 100100100,
    attribution: {
      _id: '1',
    },
  },
  {
    amount: -100,
    description: 'BarFoo',
    code: 5,
    attribution: {
      _id: '5',
    },
  },
  {
    amount: 9000,
    description: 'QQQ',
    code: 9999,
    attribution: {
      _id: '5',
    },
  },
]

const spec = [
  {
    id: 'filterAmountMin',
    expect: 2,
    arg: 0,
  },
  {
    id: 'filterAmountMin',
    expect: 3,
    arg: -1000,
  },
  {
    id: 'filterAmountMax',
    expect: 0,
    arg: -1000,
  },
  {
    id: 'filterAmountMax',
    expect: 3,
    arg: 90000,
  },
  {
    id: 'filterAmountMax',
    expect: 2,
    arg: 101,
  },
  {
    id: 'filterDescription',
    expect: 1,
    arg: 'Q',
  },
  {
    id: 'filterDescription',
    expect: 2,
    arg: 'o',
  },
  {
    id: 'filterCode',
    expect: 0,
    arg: '7',
  },
  {
    id: 'filterCode',
    expect: 1,
    arg: '0',
  },
  {
    id: 'filterCode',
    expect: 1,
    arg: '9',
  },
  {
    id: 'filterAttribution',
    expect: 1,
    arg: [{ _id: '1' }],
  },
  {
    id: 'filterAttribution',
    expect: 2,
    arg: [{ _id: '5' }],
  },
  {
    id: 'filterAttribution',
    expect: 0,
    arg: [{ _id: '7' }],
  },
]

spec.forEach(spec => {
  it('should ' + spec.id, () => {
    expect(filters(spec.id, spec.arg).func(mock).length).toEqual(spec.expect)
  })
})
