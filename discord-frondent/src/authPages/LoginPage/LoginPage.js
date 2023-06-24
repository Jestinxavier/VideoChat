import React,{useState,useEffect} from 'react';
import AuthBox from '../../shared/component/AuthBox';
import LoginPageHeader from './LoginPageHeader';
import LoginPageInput from './LoginPageInput';
import LoginPageFooter from './LoginPageFooter';
import { validateLoginForm } from '../../utils/Validator';
import { getActions } from "../../app/actions/authAction";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";





function LoginPage({login}) {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

const [isFormValid, setIsFormValid] = useState(false);

useEffect(() => {
  
    setIsFormValid(validateLoginForm({mail,password}))
    console.log(mail,password,validateLoginForm({mail,password}));
  
}, [mail,password,setIsFormValid])


const handleLogin = () => {
  const userDetails = {
    mail,
    password,
  };

  login(userDetails, navigate);
};

  return (
    <AuthBox>
        <LoginPageHeader />
        <LoginPageInput 
        mail={mail}
        setMail ={setMail}
        password={password}
        setPassword = {setPassword}
        />
        <LoginPageFooter isFormValid={isFormValid} handleLogin={handleLogin} />
     
        </AuthBox>
  )
}

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(LoginPage);
