export interface Entity {
  id: number
  name: string
}

export interface Group extends Entity {
  staff_ids?: number[]
  staff?: Staff[]
}

export interface Member extends Entity {
  group_id: number
}
export interface Staff extends Entity {
  group_ids: number[]
}
