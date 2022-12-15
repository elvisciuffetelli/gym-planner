import { Formik } from 'formik';
import { login } from '../api/users';
import Button from '../components/Button';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(5, 'Too Short!')
        .max(12, 'Too Long!')
        .required('Required'),
});

function Login() {
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
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
            login(values)
            setSubmitting(false); //move in callback
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
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 max-w-md mx-auto">
                <input
                    type="email"
                    placeholder='email'
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                />
                {errors.email && touched.email && errors.email}
                <input
                    type="password"
                    name="password"
                    placeholder='password'
                    onChange={handleChange}
                    value={values.password}
                />
                {errors.password && touched.password && errors.password}
                <Button type="submit" disabled={isSubmitting}>
                    Login
                </Button>
            </form>
        )}
        </Formik>
      </section>
    </>
  )
}

export default Login
