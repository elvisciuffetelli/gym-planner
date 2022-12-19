import { deleteExercise, editExercise } from '../api/exercises'
import { Exercise } from '../types'
import Button from './Button'
import { FaMinus, FaEdit } from 'react-icons/fa'
import { useState } from 'react'
import { Formik, FieldArray } from 'formik'
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

  return (
    <div className="flex flex-col bg-slate-100 shadow-md mx-2 my-6 rounded">
      <div className="flex justify-between mb-2 pt-2 px-2">
        <h4>{exercise?.name}</h4>
        <Button
          className="w-[30px] h-[30px] flex justify-center items-center	"
          color="red"
          noShadow
          loading={isLoading}
          roundedFull
          size="small"
          onClick={() => {
            setIsLoading(true)
            deleteExercise(exercise._id, onExerciseDeleted, setIsLoading)
          }}
        >
          <FaMinus />
        </Button>
      </div>

      <section className="form">
        <Formik
          initialValues={{
            sets: exercise.sets,
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log({ values })
            editExercise(
              exercise._id,
              values.sets,
              onExerciseEdited,
              setSubmitting
            )
          }}
        >
          {({
            values,
            setFieldValue,
            errors,
            handleSubmit,
            submitForm,
            isSubmitting,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="flex justify-between py-4 px-2"
            >
              {editMode ? (
                <FieldArray name="sets">
                  {(arrayHelpers) => (
                    <div className="flex flex-col m-auto">
                      {values.sets.map((set, index) => (
                        <div key={index} className="flex">
                          <div className="pb-2 mr-3">
                            <label htmlFor={`sets.${index}.reps`}>Reps:</label>
                            <input
                              id={`sets.${index}.reps`}
                              name={`sets.${index}.reps`}
                              type="number"
                              value={set.reps}
                              className="border-none w-12"
                              onChange={(e) =>
                                setFieldValue(
                                  `sets.${index}.reps`,
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div className="pb-2 mr-3">
                            <label htmlFor={`sets.${index}.weight`}>
                              Weight:
                            </label>
                            <input
                              id={`sets.${index}.weight`}
                              name={`sets.${index}.weight`}
                              type="number"
                              value={set.weight}
                              className="border-none w-14"
                              onChange={(e) =>
                                setFieldValue(
                                  `sets.${index}.weight`,
                                  e.target.value
                                )
                              }
                            />
                            <span>kg</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </FieldArray>
              ) : isSubmitting ? (
                <Spinner />
              ) : (
                <div>
                  {exercise.sets.map((set) => {
                    return (
                      <div key={set._id} className="flex">
                        <p className="px-2 py-2">Reps: {set.reps}</p>
                        <p className="px-2 py-2">Weight: {set.weight} kg</p>
                      </div>
                    )
                  })}
                </div>
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
