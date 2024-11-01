import {Navigate} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from '../context/AuthProvider';

const PrivateRoute = ({ children }) => {
 const { isAuthenticated } = useContext(AuthContext);

 return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute 