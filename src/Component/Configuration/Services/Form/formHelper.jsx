export const handleInputChange = (setFormData, formData) => (e) => {
    const {name, value} = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
}

export const handleMultiSelectChange = (selectedOptions, name, setFormData, formData) => {
    setFormData({
        ...formData,
        [name.name]: selectedOptions,
    });
}