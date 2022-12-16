import { Formik } from 'formik'
import { register } from '../api/users'
import Button from '../components/Button'
import * as Yup from 'yup'

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(5, 'Too Short!')
    .max(12, 'Too Long!')
    .required('Required'),
})

function Register() {
  return (
    <>
      <section className="heading">
        <h1>Register</h1>
        <p>Please register to use the app</p>
      </section>

      <section className="form">
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            register(values)
            setSubmitting(false) //move in callback
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-4 max-w-md mx-auto"
            >
              <input
                className="w-full border-slate-200 rounded-md"
                type="text"
                placeholder="name"
                name="name"
                onChange={handleChange}
                value={values.name}
              />
              <input
                className="w-full border-slate-200 rounded-md"
                type="email"
                placeholder="email"
                name="email"
                onChange={handleChange}
                value={values.email}
              />
              {errors.email && touched.email && (
                <p className="text-red-600">{errors.email}</p>
              )}
              <input
                className="w-full border-slate-200 rounded-md"
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
                value={values.password}
              />
              {errors.password && touched.password && (
                <p className="text-red-600">{errors.password}</p>
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                color="primary"
                className="w-48"
              >
                Register
              </Button>
            </form>
          )}
        </Formik>
      </section>
    </>
  )
}

export default Register
