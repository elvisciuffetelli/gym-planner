import useSWR from 'swr'
import { Exercise } from '../types'
import request from './request'

export function setExercise(
  body: { name: string },
  onExerciseSet: () => void,
  setSubmitting: (isSubmitting: boolean) => void
) {
  request<Exercise>('post', `/api/exercises`, body)
    .then((res) => {
      if (res.name) onExerciseSet()
    })
    .catch(() => {
      throw new Error('Si è verificato un errore, riprova')
    })
    .finally(() => {
      setSubmitting(false)
    })
}

export function useGetExercise() {
  const { data, error, isLoading, mutate } = useSWR('/api/exercises')

  return { error, isLoading, data, mutate }
}

export function deleteExercise(id: string, onExerciseDeleted: () => void) {
  request('delete', `/api/exercises/${id}`)
    .then((res) => {
      onExerciseDeleted()
    })
    .catch(() => {
      throw new Error('Si è verificato un errore, riprova')
    })
}

export function editExercise(id: string, body, onExerciseEdited: () => void) {
  request('put', `/api/exercises/${id}`, body)
    .then((res) => {
      onExerciseEdited()
    })
    .catch(() => {
      throw new Error('Si è verificato un errore, riprova')
    })
}
