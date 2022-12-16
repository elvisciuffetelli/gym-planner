import { deleteExercise, editExercise } from '../api/exercises'
import { Exercise } from '../types'
import Button from './Button'
import { FaMinus, FaEdit } from 'react-icons/fa'
import { useState } from 'react'
import { Formik } from 'formik'

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

  return (
    <div className="flex flex-col bg-slate-100 m-4 p-4 shadow-md">
      <div className="flex justify-between">
        <h4>{exercise?.name}</h4>
        <Button
          className="w-[30px] h-[30px] flex justify-center items-center	"
          color="red"
          noShadow
          roundedFull
          size="small"
          onClick={() => {
            deleteExercise(exercise._id, onExerciseDeleted)
          }}
        >
          <FaMinus />
        </Button>
      </div>

      <section className="form">
        <Formik
          initialValues={{ sets: 3, reps: 5, weight: 1 }}
          validate={(values) => {
            const errors = {}
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values)
            editExercise(exercise._id, values, onExerciseEdited)
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
            <form onSubmit={handleSubmit} className="">
              {editMode ? (
                <>
                  <div className="flex justify-between px-8 py-2">
                    <label htmlFor="sets">Sets</label>
                    <input
                      className="w-14 focus:ring-slate-200 focus:border-slate-200 focus:shadow-outline border-none"
                      type="number"
                      placeholder="Sets"
                      name="sets"
                      onChange={handleChange}
                      value={values.sets}
                    />
                  </div>

                  <div className="flex justify-between px-8 py-2">
                    <label htmlFor="reps">Reps</label>
                    <input
                      className="w-14 focus:ring-slate-200 focus:border-slate-200 focus:shadow-outline border-none"
                      type="number"
                      placeholder="Reps"
                      name="reps"
                      onChange={handleChange}
                      value={values.reps}
                    />
                  </div>

                  <div className="flex justify-between px-8 py-2">
                    <label htmlFor="weight">Weight</label>
                    <input
                      className="w-14 focus:ring-slate-200 focus:border-slate-200 focus:shadow-outline border-none"
                      type="number"
                      placeholder="Weight"
                      name="weight"
                      onChange={handleChange}
                      value={values.weight}
                    />
                  </div>
                </>
              ) : (
                <>
                  <p className="px-2">Sets: {exercise.sets}</p>
                  <p className="px-2">Reps: {exercise.reps}</p>
                  <p className="px-2">Weight: {exercise.weight}</p>
                </>
              )}
              <Button
                className="w-[30px] h-[30px] flex justify-center items-center"
                noShadow
                roundedFull
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
