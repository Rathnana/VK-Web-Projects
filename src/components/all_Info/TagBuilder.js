import React from 'react'

export default function TagBuilder({title}) {
  return (
    <div
        style={{background:'#e6f7ff',borderRadius:50,textAlign:'center',color:'#000000',fontSize:13,padding:'2px 10px',fontStyle:'italic'}}
    >
        {title}
    </div>
  )
}
