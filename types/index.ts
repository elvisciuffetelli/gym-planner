export type User = {
  name: string
}

export type WithChildren<T = {}> = T & {
  children?: React.ReactNode
}

export type Set = {
  _id: string
  reps: number
  weight: number
}

export type Exercise = {
  _id: string
  name: string
  sets: Set[]
  setsNumber: number
}

export type Login = {
  token: string
}
