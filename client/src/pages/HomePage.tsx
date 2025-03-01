import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import PageContainer from "../components/layout/common/PageContainer";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";

const questionData = [
  {
    id: 1,
    title: "React의 useEffect 훅을 어떻게 사용할까요?",
    author: "김민수",
    date: "2025-01-23",
    content:
      "React에서 useEffect를 사용하여 데이터를 fetching하려면 어떻게 해야 할까요? useEffect의 기본적인 사용법을 알고 싶습니다.",
  },
  {
    id: 2,
    title: "자바스크립트의 비동기 처리 이해하기",
    author: "이정민",
    date: "2025-01-22",
    content:
      "자바스크립트에서 비동기 처리 방식인 Promise와 async/await의 차이점에 대해 자세히 알고 싶습니다.",
  },
  {
    id: 3,
    title: "React에서 상태 관리 라이브러리 선택",
    author: "박수진",
    date: "2025-01-21",
    content:
      "리액트에서 상태 관리를 위해 Redux, MobX, Recoil 등 여러 라이브러리 중 무엇을 선택해야 할지 고민입니다. 각 라이브러리의 특징과 장단점을 알고 싶어요.",
  },
  {
    id: 4,
    title: "자바스크립트 클로저(Closure) 사용법",
    author: "최수영",
    date: "2025-01-20",
    content:
      "자바스크립트에서 클로저(Closure) 개념을 잘 이해하고 싶습니다. 예시를 들어 설명 부탁드립니다.",
  },
  {
    id: 5,
    title: "React 컴포넌트 간 데이터 전달 방법",
    author: "정서연",
    date: "2025-01-19",
    content:
      "React에서 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 방법과 그 반대로 데이터를 전달하는 방법을 알고 싶습니다.",
  },
  {
    id: 6,
    title: "CSS Flexbox와 Grid 차이점",
    author: "김하늘",
    date: "2025-01-18",
    content:
      "CSS에서 Flexbox와 Grid의 차이점이 무엇인가요? 각각의 사용 사례와 장단점을 알려주세요.",
  },
  {
    id: 7,
    title: "Node.js에서 비동기 함수 호출 순서",
    author: "이유진",
    date: "2025-01-17",
    content:
      "Node.js에서 비동기 함수가 호출되는 순서가 궁금합니다. 콜백 함수나 Promise의 실행 순서에 대해 설명해주세요.",
  },
];

const HomePage = () => {
  return (
    <PageContainer>
      <Box sx={{ maxWidth: "800px", margin: "0 auto", flexGrow: 1 }}>
        <Typography
          sx={{
            color: (theme) => {
              return {
                ...theme.applyStyles("light", {
                  color: "black",
                }),
                ...theme.applyStyles("dark", {
                  color: "white",
                }),
              };
            },
            fontSize: "36px",
            fontWeight: "bold",
            marginBottom: 2,
          }}
        >
          질문 및 답변
        </Typography>

        {/* 검색바 */}
        <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
          <TextField
            variant="outlined"
            placeholder="원하는 주제를 찾아보세요"
            sx={{
              flexGrow: 1,
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#03cb84",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#03cb84",
                },
              },
            }}
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
          />
          <Button variant="contained" sx={{ bgcolor: "#03cb84" }}>
            검색
          </Button>
        </Box>

        {/* 필터 버튼들 */}
        <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
          <Button
            sx={{ width: "120px", color: "gray", border: "1px solid gray" }}
            startIcon={<SortIcon />}
          >
            최신순
          </Button>
          <Button
            sx={{ width: "120px", color: "gray", border: "1px solid gray" }}
            startIcon={<SortIcon />}
          >
            추천순
          </Button>
          <Button
            sx={{ width: "120px", color: "gray", border: "1px solid gray" }}
            startIcon={<SortIcon />}
          >
            답변순
          </Button>
        </Box>

        {/* 질문 카드들 */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {questionData.map((question) => (
            <Box key={question.id}>
              <Card
                sx={{ width: "100%", display: "flex", flexDirection: "column" }}
              >
                <CardContent sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", marginBottom: 1 }}
                  >
                    {question.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ marginBottom: 2 }}
                  >
                    {question.content}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontSize: "14px" }}
                  >
                    작성자: {question.author} | 작성일: {question.date}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-start", padding: 2 }}>
                  <Button size="small" sx={{ color: "#03cb84" }}>
                    답변하기
                  </Button>
                  <Button size="small" sx={{ color: "#03cb84" }}>
                    관심
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </PageContainer>
  );
};

export default HomePage;
