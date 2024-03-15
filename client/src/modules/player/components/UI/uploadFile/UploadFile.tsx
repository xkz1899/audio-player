import React from "react"
import { RiUploadCloud2Fill } from "react-icons/ri"

import st from "./UploadFile.module.scss"

interface IUploadFile {
	id: string
	title: string
	file: FileList | null
	setFile: React.Dispatch<React.SetStateAction<FileList | null>>
}
const UploadFile = ({ id, title, file, setFile }: IUploadFile) => {
	return (
		<button title={title} className={st.upload__input}>
			<label htmlFor={id}>
				<input id={id} type="file" onChange={e => setFile(e.target.files)} />
				<RiUploadCloud2Fill />
			</label>
			<span>{file && file[0]?.name}</span>
		</button>
	)
}

export default UploadFile
