import { deleteExercise, editExercise } from '../api/exercises'
import { Exercise } from '../types'
import Button from './Button'
import { FaMinus, FaEdit } from 'react-icons/fa'
import { useState } from 'react'
import { Formik } from 'formik'
import Spinner from './Spinner'

type Props = {
  exercise: Exercise
  onExerciseDeleted: () => void
  onExerciseEdited: () => void
}

function ExerciseItem({
  exercise,
  onExerciseDeleted,
  onExerciseEdited,
}: Props) {
  const [editMode, setEditMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="flex flex-col bg-slate-100 shadow-md mx-2 my-6 rounded">
      <div className="flex justify-between mb-2 pt-2 px-2">
        <h4>{exercise?.name}</h4>
        <Button
          className="w-[30px] h-[30px] flex justify-center items-center	"
          color="red"
          noShadow
          roundedFull
          size="small"
          onClick={() => {
            deleteExercise(exercise._id, onExerciseDeleted, setIsLoading)
          }}
        >
          <FaMinus />
        </Button>
      </div>

      <section className="form">
        <Formik
          initialValues={{ sets: 0, reps: 0, weight: 0 }}
          onSubmit={(values, { setSubmitting }) => {
            setIsLoading(true)
            editExercise(exercise._id, values, onExerciseEdited, setSubmitting)
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            submitForm,
            isSubmitting,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="flex justify-between py-4 px-2"
            >
              {editMode ? (
                <div className="flex">
                  <div className="flex justify-between items-center	">
                    <label htmlFor="sets">Sets:</label>
                    <input
                      className="w-10 focus:ring-slate-200 focus:border-slate-200 focus:shadow-outline border-none"
                      type="number"
                      name="sets"
                      onChange={handleChange}
                      value={values.sets}
                    />
                  </div>

                  <div className="flex justify-between items-center	">
                    <label htmlFor="reps">Reps:</label>
                    <input
                      className="w-12 focus:ring-slate-200 focus:border-slate-200 focus:shadow-outline border-none"
                      type="number"
                      name="reps"
                      onChange={handleChange}
                      value={values.reps}
                    />
                  </div>

                  <div className="flex justify-between items-center	">
                    <label htmlFor="weight">Weight:</label>
                    <input
                      className="w-14 focus:ring-slate-200 focus:border-slate-200 focus:shadow-outline border-none"
                      type="number"
                      name="weight"
                      onChange={handleChange}
                      value={values.weight}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <p className="px-2 py-2">Sets: {exercise.sets}</p>
                  <p className="px-2 py-2">Reps: {exercise.reps}</p>
                  <p className="px-2 py-2">Weight: {exercise.weight}</p>
                </>
              )}
              <Button
                className="w-[30px] h-[30px] flex justify-center items-center self-end"
                noShadow
                roundedFull
                loading={isSubmitting}
                size="small"
                onClick={() => {
                  setEditMode(!editMode)
                  editMode && submitForm()
                }}
              >
                <FaEdit />
              </Button>
            </form>
          )}
        </Formik>
      </section>
    </div>
  )
}

export default ExerciseItem
