import { useEffect } from 'react'
import { useGetExercise } from '../api/exercises'
import { useAuthentication } from '../customHooks/useAuthentication'
import { Exercise } from '../types'
import ExerciseForm from './ExerciseForm'
import ExerciseItem from './ExerciseItem'

function Dashboard() {
  const { user } = useAuthentication({ redirectTo: '/login' })
  const { data, error, isLoading, mutate } = useGetExercise()

  if (!user) return <></>

  return (
    <>
      <section className="py-2 px-4 text-center">
        <h1>Welcome {user?.name}</h1>
        <h3 className="py-4">Exercise Dashboard</h3>
      </section>

      <ExerciseForm onExerciseSet={() => mutate()} />

      <section className="pb-4">
        {data?.length > 0 ? (
          <div className="">
            {data.map((exercise: Exercise) => (
              <ExerciseItem
                key={exercise._id}
                exercise={exercise}
                onExerciseDeleted={() => mutate()}
                onExerciseEdited={() => mutate()}
              />
            ))}
          </div>
        ) : (
          <h3>You have not set any exercises</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
