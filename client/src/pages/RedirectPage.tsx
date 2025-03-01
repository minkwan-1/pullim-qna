import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const RedirectPage = () => {
  const [data, setData] = useState(null);
  const [query] = useSearchParams();
  const navigate = useNavigate();
  const code = query.get("code");
  const provider = query.get("provider");

  console.log({ data, provider, code });

  useEffect(() => {
    const postFn = async () => {
      if (!provider || !code) {
        console.log("유효하지 않은 요청입니다.");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/auth/${provider}/user`, // 백엔드로 요청 보내기
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
          }
        ).then((res) => res.json());

        setData(response);

        // 로그인 성공 시 /phone 페이지로 이동
        navigate("/phone");
      } catch (err) {
        console.error("Error during fetch:", err);
      }
    };

    if (code) {
      postFn();
    } else {
      console.log("인가 코드 없음");
    }
  }, [code, navigate, provider]);

  return <div>redirect 용 페이지</div>;
};

export default RedirectPage;
