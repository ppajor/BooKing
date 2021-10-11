export const getData = async (path) => {
  return await fetch(path)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};

export const filterData = (data) => {
  return data.filter((el) => {
    if (!el.volumeInfo.hasOwnProperty("description"))
      el.volumeInfo.description = "No description";

    if (!el.volumeInfo.hasOwnProperty("pageCount")) el.volumeInfo.pageCount = 1;

    if (!el.volumeInfo.hasOwnProperty("imageLinks"))
      el.volumeInfo.imageLinks = null;

    if (!el.volumeInfo.hasOwnProperty("authors")) return false;

    return true;
  });
};
