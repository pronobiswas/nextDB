import React from 'react'

export default function page({params}) {
const email = decodeURIComponent(params.email);

  return (
    <div>
        <h3>this is forgot passwprd page</h3>
        <h2>this is the email : {email}</h2>
        <form>
            <label > enter your verification code</label>
            <br/>
            <input type="text" placeholder='verification code' id='verificationCode'></input>
            <button>submit</button>
        </form>
    </div>
  )
}
