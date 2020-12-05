export default (data:any) => {
  const formData = new FormData();
  for (let key in data) {
    if (Array.isArray(data[key])) {
      for (let i = 0; i < data[key].length; i++) {
        formData.append(`${key}[${i}]`, data[key][i]);
      }
    } else {
      formData.append(key, data[key]);
    }
  }

  return formData;
};
