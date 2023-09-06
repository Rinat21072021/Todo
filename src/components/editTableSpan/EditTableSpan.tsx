import React, {useState} from "react";


type EdittableSpanType={
	title:string
	callback:(newTitle:string)=>void
}
export const EditTableSpan = (props:EdittableSpanType)=>{
	const [editMode, setEditMode] = useState(false)
	const [title, setTitle] = useState(props.title)

	const onEditHandle = ()=> setEditMode(true)
	const onToggleInSpanTask = ()=> {
		setEditMode(false)
		props.callback(title)

	}
	return  (
		editMode
			? <input autoFocus
					 onBlur={onToggleInSpanTask}
					 value={title}
					 onChange={(e)=>{setTitle(e.currentTarget.value)}}

			/>
			: <span onDoubleClick={onEditHandle}>{title}</span>
	)
}