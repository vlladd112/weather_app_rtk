// eslint-disable-next-line
import styles from '../styles/userInfo.css';

export default function UserInfo ({ user, authenticationStatus, action }) {
    if(authenticationStatus === 'loading') {
        return (
            <p>signing in...</p>
        )
    }
    if(authenticationStatus === 'idle') {
        return(
            <div className='info-wrapper'>
            <p>{user?.email}</p>
            <button className={user ? 'show' : 'hidden'} onClick={action}>Sign out</button>
          </div>
        )
    }
}