import axios from "axios";

export const imageUpload = async (images) => {
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();
    formData.append("file", item);
    formData.append("upload_preset", "mynextjs");

    await axios
      .post("https://api.cloudinary.com/v1_1/dp0c6xyx2/image/upload", formData)
      .then((res) => {
        imgArr.push({
          public_id: res.data.public_id,
          url: res.data.secure_url,
        });
      });
  }
  return imgArr;
};
