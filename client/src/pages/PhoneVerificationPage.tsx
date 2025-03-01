import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import PageContainer from "../components/layout/common/PageContainer";
import axios from "axios";

// Define a custom error interface
interface ApiError {
  response?: {
    data: {
      message: string;
    };
  };
}

const PhoneVerificationPage = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [message, setMessage] = useState("");

  // 전화번호 인증 코드 발송 처리 함수
  const handleSendCode = async () => {
    console.log("Sending verification code for phone number:", phoneNumber);
    setIsSending(true);
    try {
      const response = await axios.post("http://localhost:3000/api/send-code", {
        phoneNumber,
      });
      console.log("Response from send-code:", response.data);
      setMessage(response.data.message || "Verification code sent!");
    } catch (error) {
      const apiError = error as ApiError;
      console.error("Error sending verification code:", apiError);
      setMessage(
        apiError.response?.data?.message || "Failed to send verification code."
      );
    } finally {
      setIsSending(false);
    }
  };

  // 인증 코드 확인 처리 함수
  const handleVerifyCode = async () => {
    console.log(
      "Verifying code for phone number:",
      phoneNumber,
      "with code:",
      verificationCode
    );
    setIsVerifying(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/verify-code",
        {
          phoneNumber,
          verificationCode,
        }
      );
      console.log("Response from verify-code:", response.data);
      setMessage(response.data.message || "Phone number verified!");
      if (
        response.data.message === "Phone number verified and user registered!"
      ) {
        navigate("/home");
      }
    } catch (error) {
      const apiError = error as ApiError;
      console.error("Error verifying verification code:", apiError);
      setMessage(apiError.response?.data?.message || "Verification failed.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <PageContainer>
      {" "}
      <Box sx={{ maxWidth: "400px", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Phone Verification
        </Typography>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Phone Number"
            placeholder="+821012345678"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendCode}
            disabled={isSending || !phoneNumber}
            fullWidth
          >
            {isSending ? <CircularProgress size={24} /> : "Send Code"}
          </Button>
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Verification Code"
            placeholder="Enter the code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleVerifyCode}
            disabled={isVerifying || !verificationCode}
            fullWidth
          >
            {isVerifying ? <CircularProgress size={24} /> : "Verify Code"}
          </Button>
        </Box>
        {message && <Typography color="error">{message}</Typography>}
      </Box>
    </PageContainer>
  );
};

export default PhoneVerificationPage;
