export const validAudioType = (name: string) => {
	const listType = ["mp3", "aac", "wav", "flac", "ogg", "amr"]
	const type = name.split(".").at(-1)
	for (let i = 0; i < listType.length; i++) {
		if (listType[i] === type) {
			return true
		}
	}
	return false
}

export const validImageType = (name: string) => {
	const listType = [
		"jpeg",
		"jpg",
		"png",
		"ico",
		"gif",
		"tiff",
		"webp",
		"svg",
		"psd",
		"avif",
	]
	const type = name.split(".").at(-1)
	for (let i = 0; i < listType.length; i++) {
		if (listType[i] === type) {
			return true
		}
	}
	return false
}
