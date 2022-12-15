import { Formik } from 'formik';
import Button from './Button';
import { setExercise } from '../api/exercises';

type Props = {
  onExerciseSet: () => void
}

function ExerciseForm({onExerciseSet}: Props) {

  return (
    <>
      <section className='heading'>
        <h1>
           Login
        </h1>
        <p>Login and start setting exercises</p>
      </section>

      <section className='form'>
        <Formik
        initialValues={{ name: '', }}
        validate={values => {
            const errors = {};
          
            return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
            console.log(values)
            setExercise(values, onExerciseSet)
            setSubmitting(false); //move in callback
        }}
        >
        {({
            values,
            errors,
            handleChange,
            handleSubmit,
            isSubmitting,
        }) => (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 max-w-md mx-auto">
                <input
                    type="text"
                    placeholder='Exercise name'
                    name="name"
                    onChange={handleChange}
                    value={values.name}
                />
                <Button type="submit" disabled={isSubmitting}>
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
