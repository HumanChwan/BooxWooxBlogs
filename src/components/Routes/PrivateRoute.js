import React from 'react'
import { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useUser } from '../Contexts/UserContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
<<<<<<< HEAD
    const { user, setShowLoginModal } = useUser()
    useEffect(() => {
        if (!user) {
            setShowLoginModal(true)
=======
    const { user, setShowOverlay } = useUser()
    useEffect(() => {
        if (!user) {
            setShowOverlay(true)
>>>>>>> 5ab624dcf1653cd95a5ef48ba176906f85806793
        }
    }, [])

    return (
        <Route
            {...rest}
            render={(routerProps) => {
                return user ? (
                    <Component {...routerProps} />
                ) : (
                    <Redirect to='/' />
                )
            }}
        />
    )
}
export default PrivateRoute
