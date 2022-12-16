import { deleteExercise } from "../api/exercises"
import { Exercise } from "../types"
import Button from "./Button"
import {FaMinus, FaEdit} from 'react-icons/fa'
import { useState } from "react"
import { Formik } from 'formik';

type Props = {
  exercise: Exercise,
  onExerciseDeleted: () => void
}

function ExerciseItem({ exercise, onExerciseDeleted }: Props) {
  const [editMode, setEditMode] = useState(false)

  return (
    <div className='flex flex-col bg-slate-200 m-4 p-4 shadow-md'>
          <h4>{exercise?.name}</h4>
          <section className='form'>
              <Formik
              initialValues={{ sets: 3, reps: 5, weight: 1 }}
              validate={values => {
                  const errors = {};
                  return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                  console.log(values)
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
                        <input
                            className=''
                            type="number"
                            placeholder='Sets'
                            name="sets"
                            onChange={handleChange}
                            value={values.sets}
                        />
                        <input
                            className=''
                            type="number"
                            placeholder='Reps'
                            name="reps"
                            onChange={handleChange}
                            value={values.reps}
                        />
                        <input
                            className=''
                            type="number"
                            placeholder='Weight'
                            name="weight"
                            onChange={handleChange}
                            value={values.weight}
                        />
                      </>
                      ) : (<>
                      <span className="px-2">2</span>
                      <span className="px-2">3</span>
                      <span className="px-2">5</span>
                      </>)}
                    <Button 
                      className='w-[30px] h-[30px] flex justify-center items-center'
                      noShadow
                      roundedFull
                      size="small" 
                      onClick={() => {
                        setEditMode(!editMode)
                        editMode && submitForm()
                    }}>
                      <FaEdit />
                    </Button>
                  </form>
              )}
              </Formik>
          </section>
      <div>
        <Button 
          className='w-[30px] h-[30px] flex justify-center items-center	' 
          color='red' 
          noShadow
          roundedFull
          size="small" 
          onClick={() => {
            deleteExercise(exercise._id, onExerciseDeleted)
        }}>
          <FaMinus />
        </Button>
      </div>
    </div>
  )
}

export default ExerciseItem
