import { Formik } from 'formik'
import Button from './Button'
import { setExercise } from '../api/exercises'
import * as Yup from 'yup'
type Props = {
  onExerciseSet: () => void
}

const ExerciseSchema = Yup.object().shape({
  name: Yup.string().required('Exercise name is required'),
  setsNumber: Yup.number().required('Sets number is required'),
})

function ExerciseForm({ onExerciseSet }: Props) {
  return (
    <>
      <section className="text-center	">
        <h4 className="py-2">Please set an exercise</h4>
      </section>

      <section className="form">
        <Formik
          initialValues={{ name: '', setsNumber: 3 }}
          validationSchema={ExerciseSchema}
          onSubmit={(values, { setSubmitting }) => {
            setExercise(values, onExerciseSet, setSubmitting)
          }}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col max-w-md items-center mx-auto"
            >
              <label htmlFor="name">Exercise name</label>
              <input
                className="w-full border-slate-200 rounded-md mb-4"
                type="text"
                placeholder="Exercise name"
                name="name"
                onChange={handleChange}
                value={values.name}
              />
              {errors.name && <p className="text-red-600">{errors.name}</p>}
              <label htmlFor="setsNumber">Sets number</label>
              <input
                className="w-full border-slate-200 rounded-md mb-4"
                type="number"
                placeholder="Sets number"
                name="setsNumber"
                onChange={handleChange}
                value={values.setsNumber}
              />
              {errors.setsNumber && (
                <p className="text-red-600">{errors.setsNumber}</p>
              )}
              <Button
                loading={isSubmitting}
                type="submit"
                color="primary"
                disabled={isSubmitting}
                className="w-48"
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </section>
    </>
  )
}

export default ExerciseForm
