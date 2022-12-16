import { Formik } from 'formik'
import Button from './Button'
import { setExercise } from '../api/exercises'
import * as Yup from 'yup'
type Props = {
  onExerciseSet: () => void
}

const ExerciseSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
})

function ExerciseForm({ onExerciseSet }: Props) {
  return (
    <>
      <section className="text-center	">
        <p>Set an exercise</p>
      </section>

      <section className="form">
        <Formik
          initialValues={{ name: '' }}
          validationSchema={ExerciseSchema}
          onSubmit={(values, { setSubmitting }) => {
            setExercise(values, onExerciseSet, setSubmitting)
          }}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-4 max-w-md mx-auto items-center"
            >
              <input
                className="w-full"
                type="text"
                placeholder="Exercise name"
                name="name"
                onChange={handleChange}
                value={values.name}
              />
              {errors.name && <p className="text-red-600">{errors.name}</p>}
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
