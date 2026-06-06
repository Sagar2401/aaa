import React from 'react';
import Logo from '../../../assets/images/mooncrash_logo.png';

const LogoHeader = (props) => {
    const {history} = props;
    const goToHome = () => {
        history.push("/");
    }
    return (
        <>
            <div className='logo-header' onClick={()=>goToHome()}>
                <img className="logo col" src={Logo} alt="Italian Trulli"></img>
            </div>
        </>
    )
}

export default LogoHeader