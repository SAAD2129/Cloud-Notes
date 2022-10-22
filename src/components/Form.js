import React from 'react'

const Form = () => {
    return (
        <div>
            <div className="card p-3 mb-3">
                <h3>Add Note</h3>
                <form action="" className='my-3'>
                    <div className="mb-2">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name='title' className='form-control' />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description" name='description' className='form-control' />
                    </div>
                    <div className="mt-3">
                        <button className="btn btn-secondary" onClick={()=>{props}}>Add note</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form