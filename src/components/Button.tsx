import React from "react";

type ButtonType = {
	name:string
	callback:()=>void
	className?:string
}
export const Button = (props:ButtonType)=>{
	return <button className={props.className} onClick={props.callback}>{props.name}</button>
}