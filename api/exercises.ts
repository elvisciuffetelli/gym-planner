import useSWR from 'swr'
import { Exercise, Set } from '../types'
import { showToast } from '../utils'
import request from './request'

export function setExercise(
  body: { name: string; setsNumber: number },
  onExerciseSet: () => void,
  setSubmitting: (isSubmitting: boolean) => void
) {
  const arr = Array.from(Array(body.setsNumber).keys())
  const sets = arr.map(() => ({ reps: 5, weight: 10 }))

  request<Exercise>('post', `/api/exercises`, {
    ...body,
    sets,
  })
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
  sets: Set[],
  onExerciseEdited: () => void,
  setSubmitting: (isSubmitting: boolean) => void
) {
  request('put', `/api/exercises/${id}`, { sets })
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
