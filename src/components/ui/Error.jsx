import { Link, useNavigate } from 'react-router-dom'
import classes from './Error.module.scss'

const Error = ({ error, small, search }) => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className={`${small && classes['error--small']} ${!small && classes['error--big']}`}>
      <p className={classes.message}>{error}</p>
      <button className='btn' onClick={!search ? handleGoBack : handleGoHome}>{!search ? 'powrót' : "home"}</button>
    </div>
  )
}

export default Error
