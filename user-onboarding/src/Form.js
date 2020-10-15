import React from 'react'

function Form(props){
    const { change, form, submit, disabled, errors } = props

    const onSubmit = evt => {
        evt.preventDefault();
        submit();
    }

    const onChange = evt => {
        const { name, value, type, checked } = evt.target;
        const valueToUse = type === "checkbox" ? checked : value;
        change(name, valueToUse)
    }


    return(
        <div className='App'>
            <form onSubmit={onSubmit}>
                <div className="errors">
                    <div>{errors.name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.terms}</div>
                </div>
      
                <label>Name
                    <input onChange={onChange} value={form.name} name='name' type='text' />
                </label>
                <label>Email
                    <input onChange={onChange} value={form.email} name='email' type='email' />
                </label>
                <label>Password
                    <input onChange={onChange} value={form.password} name='password' type='password' />
                </label>
                <label>Terms of Service
                    <input onChange={onChange} checked={form.terms} name='terms' type='checkbox' />
                </label>
                <button id='submitBtn' disabled={disabled}>Submit</button>
            </form>
        </div>
    )
}
export default Form