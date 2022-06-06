import React, {useEffect} from 'react'
import qs from 'qs';
import {useLocation, useHistory} from 'react-router-dom';
import {auth} from './firebase';

function EmailVerification() {

    const location = useLocation();
    const history = useHistory("");
    const {mode, oobCode} = qs.parse(location.search, { ignoreQueryPrefix: true })

    useEffect(() => {
        if(mode == 'verifyEmail') {
            auth.applyActionCode(oobCode).then((resp) => {
                alert("Email verified");
                history.push("/login");
              }).catch((error) => {
                alert(error.message);
              });
        }
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default EmailVerification
