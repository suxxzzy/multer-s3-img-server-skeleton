import "./App.css";
import { useState } from "react";
const axios = require("axios");

function Image() {
  const [img, setImg] = useState("");
  const requestImg = async (event) => {
    // form tag를 사용하지 않아도 formdata를 만들 수 있습니다.
    let formData = new FormData();
    formData.append("image", event.target.files[0]);

    for (let key of formData.keys()) {
      console.log(key, "첨부한 파일 키");
    }

    for (let value of formData.values()) {
      console.log(value, "첨부한 파일 내용");
    }

    // 생성한 폼 데이터에 파일 객체를 할당하고, 서버에 요청을 보냅니다.
    try {
      await axios.post(`http://localhost:4000/image`, formData).then((res) => {
        console.log(res.data);
        setImg(res.data);
      });
    } catch (error) {
      console.log(error);
      alert("server error");
    }
  };
  return (
    <div>
      <div id="imageEdit">
        <input
          type="file"
          id="image_uploads"
          name="image"
          accept="image/*"
          onChange={requestImg}
        ></input>
        <img src={img} width="200px" height="200px"></img>
      </div>
    </div>
  );
}

export default Image;
