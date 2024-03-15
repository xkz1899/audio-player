
export const removeType = (name: string) => {
	return name.split(".").slice(0, -1).join(".")
}
