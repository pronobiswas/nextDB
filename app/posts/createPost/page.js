import React from 'react'

export default function page() {
  return (
    <div>
        <h2>create a post here</h2>
        <div className='max-w-4xl mx-auto'>
            <form>
                <div>
                    <label>post title</label>
                    <input type='text' placeholder='enter post title' name='title'></input>
                </div>
                <div>
                    <label>post description</label>
                    <input type='text' placeholder='enter post description' name='description'></input>
                </div>
            </form>
        </div>
    </div>
  )
}
