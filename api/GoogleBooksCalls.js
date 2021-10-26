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

export const bookData = (apiData) => {
  let obj = {
    id: apiData.id,
    title: apiData.volumeInfo.title,
    authors: apiData.volumeInfo.authors[0],
    description: apiData.volumeInfo.description,
    thumbnail: apiData.volumeInfo.imageLinks,
    pageCount: apiData.volumeInfo.pageCount,
  };
  if (apiData.volumeInfo.imageLinks) obj.thumbnail = apiData.volumeInfo.imageLinks.thumbnail;
  return obj;
};

export const needEdit = (obj) => {
  for (const property in obj) {
    if (!obj[property]) return true;
  }
  return false;
};

export const filterData = (data) => {
  const filtered = [...data];
  return filtered.filter((el) => {
    if (!el.volumeInfo.hasOwnProperty("description")) el.volumeInfo.description = "No description";

    if (!el.volumeInfo.hasOwnProperty("pageCount")) el.volumeInfo.pageCount = undefined;

    if (!el.volumeInfo.hasOwnProperty("imageLinks")) {
      el.volumeInfo.imageLinks = undefined;
      // el.volumeInfo.imageLinks.thumbnail = undefined;
    }

    if (!el.volumeInfo.hasOwnProperty("authors")) return false;

    return true;
  });
};
