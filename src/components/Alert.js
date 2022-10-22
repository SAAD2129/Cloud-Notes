import React from 'react'

export default function Alert(props) {
    return (
        <div className='alertbox'>
        {props.alert && <div className={`alert alert-${props.alert.type}  alert-dismissible fade show`} role="alert">
            <strong>{props.alert.type.toUpperCase()}&nbsp; &nbsp; </strong>{props.alert.msg}
        </div>}
        </div>
    )
}
