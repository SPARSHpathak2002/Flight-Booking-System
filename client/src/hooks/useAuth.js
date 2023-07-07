import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    
    let isAdmin = false
    
    if (token) {
        const decoded = jwtDecode(token)
        const { email, roles } = decoded.UserInfo

        
        isAdmin = roles.includes('admin')


        return { email, roles,  isAdmin }
    }

    return { email: '', roles: [], isAdmin }
}
export default useAuth
