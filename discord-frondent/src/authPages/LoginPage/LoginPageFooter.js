import React from 'react'
import { useNavigate} from "react-router-dom"
import CustomPrimaryButton from '../../shared/component/CustomPrimaryButton'
import RedirectInfo from '../../shared/component/RedirectInfo'
import { Tooltip } from '@mui/material'


function LoginPageFooter({handleLogin,isFormValid}) {
    const navigate  = useNavigate()
    const handlePushToRegisterPage = ()=>{
        navigate('/register')
    }
    function getFormNotValidMessage (){
        return "please fill all the fields correctly!"
    }
    function getFormValidMessage(){
        return "plese login"
    }
  return (<>
    <div>
        <Tooltip
        title={!isFormValid?getFormNotValidMessage():getFormValidMessage()}
        >
        <CustomPrimaryButton
        label='Log In'
        additionalStyles={{
            marginTop:"30px"
            }}
    disabled = {!isFormValid}
    onClick = {handleLogin}
        />
        </Tooltip>
        
    </div>
    <RedirectInfo
    text="Need an Account"
    redirectText='create an account'
    additionalStyles={{marginTop:'5px'}}
    redirectHandler={handlePushToRegisterPage}
    />
    </>
  )
}

export default LoginPageFooter