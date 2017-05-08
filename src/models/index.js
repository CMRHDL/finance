import { shortDate, currency } from '../util'

export const recordsetColumns = [
  { displayName: 'Code', prop: 'code', display: e => e },
  { displayName: 'Datum', prop: 'date', display: e => shortDate(e) },
  { displayName: 'Betrag', prop: 'amount', display: e => currency(e) },
  { displayName: 'Beschreibung', prop: 'description', display: e => e },
  {
    displayName: 'Zuordnung',
    prop: 'attribution.attribution',
    display: e => e,
  },
]
