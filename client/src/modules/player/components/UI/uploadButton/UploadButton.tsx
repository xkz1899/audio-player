import React from "react"
import { RiUploadCloud2Fill } from "react-icons/ri"
import st from "./UploadButton.module.scss"

interface IUploadButton {
	setCreateVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const UploadButton = ({ setCreateVisible }: IUploadButton) => {
	return (
		<button
			title="Upload track"
			className={st.upload}
			onClick={() => setCreateVisible(true)}
		>
			<RiUploadCloud2Fill />
		</button>
	)
}

export default UploadButton
