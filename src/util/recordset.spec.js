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
    id: 'amountMin',
    expect: 2,
    arg: 0,
  },
  {
    id: 'amountMin',
    expect: 3,
    arg: -1000,
  },
  {
    id: 'amountMax',
    expect: 0,
    arg: -1000,
  },
  {
    id: 'amountMax',
    expect: 3,
    arg: 90000,
  },
  {
    id: 'amountMax',
    expect: 2,
    arg: 101,
  },
  {
    id: 'description',
    expect: 1,
    arg: 'Q',
  },
  {
    id: 'description',
    expect: 2,
    arg: 'o',
  },
  {
    id: 'code',
    expect: 0,
    arg: '7',
  },
  {
    id: 'code',
    expect: 1,
    arg: '0',
  },
  {
    id: 'code',
    expect: 1,
    arg: '9',
  },
  {
    id: 'attribution',
    expect: 1,
    arg: [{ _id: '1' }],
  },
  {
    id: 'attribution',
    expect: 2,
    arg: [{ _id: '5' }],
  },
  {
    id: 'attribution',
    expect: 0,
    arg: [{ _id: '7' }],
  },
]

spec.forEach(spec => {
  it('should filter by ' + spec.id, () => {
    expect(filters(spec.id, spec.arg).func(mock).length).toEqual(spec.expect)
  })
})
