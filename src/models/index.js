import { shortDate, currency } from '../util'

export const recordsetColumns = [
  { displayName: 'Code', prop: 'code', func: e => e },
  { displayName: 'Datum', prop: 'date', func: e => shortDate(e) },
  { displayName: 'Betrag', prop: 'amount', func: e => currency(e) },
  { displayName: 'Beschreibung', prop: 'description', func: e => e },
  { displayName: 'Zuordnung', prop: 'attribution.attribution', func: e => e },
]
