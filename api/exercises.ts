import useSWR from 'swr'
import { Exercise } from '../types'
import { showToast } from '../utils'
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
    .catch(({ error }) => {
      showToast(error, 'error')
    })
    .finally(() => {
      setSubmitting(false)
    })
}

export function useGetExercise() {
  const { data, error, isLoading, mutate } = useSWR('/api/exercises')

  return { error, isLoading, data, mutate }
}

export function deleteExercise(
  id: string,
  onExerciseDeleted: () => void,
  setIsLoading: (isLoading: boolean) => void
) {
  request('delete', `/api/exercises/${id}`)
    .then((res) => {
      onExerciseDeleted()
    })
    .catch(({ error }) => {
      showToast(error, 'error')
    })
    .finally(() => {
      setIsLoading(false)
    })
}

export function editExercise(
  id: string,
  body: { sets: number; reps: number; weight: number },
  onExerciseEdited: () => void,
  setSubmitting: (isSubmitting: boolean) => void
) {
  request('put', `/api/exercises/${id}`, body)
    .then((res) => {
      onExerciseEdited()
    })
    .catch(({ error }) => {
      showToast(error, 'error')
    })
    .finally(() => {
      setSubmitting(false)
    })
}
