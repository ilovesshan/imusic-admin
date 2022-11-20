interface ITableColumn<T> {
  name: string,
  label: string
  align?: string,
  required: boolean,
  field: (row: T) => string,
  format?: (val: any) => string,
  sortable?: boolean
}

export {
  ITableColumn
}


