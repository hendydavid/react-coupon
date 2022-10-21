import React from 'react'
import { JsxElement } from 'typescript'

type Prop = {
message:string,
children:JsxElement    
} 

const message = (prop:Prop) => {
  return (
    <>
    {
   prop.message.length ===0&& ''
   }
   </>
  )
}

export default message