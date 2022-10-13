import { KeyOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
export var validationError=false
export const CommonInputs = ({ getInputsValue, clearInputs, data, disable }) => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState(null)
    const [fullNameHasError,setFullNameHasError]=useState(false)
    const [emailHasError,setEmailHasError]=useState(false)
    const [roleHasError,setRoleHasError]=useState(false)



    useEffect(() => {
        if (getInputsValue) {
            getInputsValue(fullName, email, role)
        }
    }, [fullName, email, role])
    useEffect(() => {
        setFullName('')
        setEmail('')
        setRole('')
    }, [clearInputs])

    useEffect(() => {
        if (data) {
            setFullName(data.fullName)
            setEmail(data.email)
            setRole(data.isAdmin)
        }
    }, [data])

    const handleFullname=(e)=>{
        setFullName(e.target.value)
        if(fullName.length < 3){
            validationError=true
            setFullNameHasError(true)
        }else {
            setFullNameHasError(false)
            validationError=false
        }
    }
    const handleEmail=(e)=>{
        setEmail(e.target.value)
        const emailValidation=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(! emailValidation.test(email) ){
            validationError=true
            setEmailHasError(true)
        }else {
            validationError=false
            setEmailHasError(false)
        }
    }
    const handleRole=(e)=>{
        setRole(e.target.value)
        if(e.target.value === null ){
            validationError=true
            setRoleHasError(true)
        }else {
            validationError=false
            setRoleHasError(false)
        }
    }
  useEffect(()=>{
    if(email.length < 1 || fullName.length < 1){
        validationError=true
    }else {
        validationError=false
    }
  },[email,fullName,role])
    return (
        <div>
            <div className='input-icons'>
                <i className="icon" ><UserOutlined /></i>
                <input
                    placeholder='Fullname'
                    className="inputsCommon input-field"
                    type="text"
                    value={fullName}
                    onChange={(e) => handleFullname(e)}
                    disabled={disable}
                    required
                />
                <p>{fullNameHasError? <small  className='red'>fullname must include at least 4 symbols </small> : <></> } </p>
            </div>
            <div className='input-icons'>
                <i className="icon" ><MailOutlined /></i>
                <input
                    placeholder='E-Mail'
                    className="inputsCommon input-field"
                    type="text"
                    value={email}
                    onChange={(e) => handleEmail(e)}
                    disabled={disable}
                    required
                />
                <p>{emailHasError? <small  className='red'>type valid email address </small> : <></> } </p>

            </div>
            <div className='input-icons'>
                <i className="icon" ><KeyOutlined /></i>
                <select
                    className='inputsCommon input-field'
                    placeholder='Role'
                    value={role}
                    onChange={(e)=>handleRole(e)}
                    disabled={disable}
                >
                    <option disabled value={null} >Role </option>
                    <option value={true} >Admin </option>
                    <option value={false} >User </option>
                </select>
                <p>{roleHasError? <small  className='red'>this field is required </small> : <></> } </p>

            </div>
        </div>
    )
}
