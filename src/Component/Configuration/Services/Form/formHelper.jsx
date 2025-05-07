export const handleInputChange = (setFormData, formData) => (e) => {
    const {name, value} = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
}

// export const handleMultiSelectChange = (selectedOptions, name, setFormData, formData) => {
export const handleMultiSelectChange = (setFormData, formData) => (selectedOptions, name) => {
    // setFormData({
    //     ...formData,
    //     [name]: selectedOptions,
    // });
    setFormData((prevData) => ({
        ...prevData,
        [name]: selectedOptions,
      }));

    // console.log("testing name", name);
}

export const handleCheckboxChange = (setFormData, formData) => (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };