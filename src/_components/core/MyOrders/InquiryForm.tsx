import { sumbitInquiry } from "@/redux/slices/orderSlice";
import { AppDispatch } from "@/redux/store";
import { getUserDetails } from "@/utils/utils";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const InquiryForm = ({ orderId }: { orderId: string }) => {
  const userDetails = getUserDetails();
  const [selectedOption, setSelectedOption] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const inquiryOptions = [
    { value: "general_support", label: "General Support" },
    { value: "product_feedback", label: "Product Feedback" },
    { value: "billing_issues", label: "Billing Issues" },
    { value: "technical_support", label: "Technical Support" },
    { value: "feature_request", label: "Feature Request" },
    { value: "order_status", label: "Order Status" },
    { value: "refund_request", label: "Refund Request" },
    { value: "faq", label: "FAQ & Help" },
    { value: "partnerships", label: "Partnerships & Collaborations" },
  ];

  const handleSubmit = async () => {
    if (!selectedOption || !message.trim()) {
      toast.error("Please select an option and enter a message.");
      return;
    }

    setLoading(true);
    try {
      await dispatch(
        sumbitInquiry({
          orderId,
          options: selectedOption,
          description: message,
        })
      ).unwrap();
      toast.success("Inquiry submitted successfully!");
      setSelectedOption("");
      setMessage("");
    } catch (error) {
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "90%",
        padding: "20px 20px 0px 20px",
        backgroundColor: "#FDF8F3",
      }}
    >
      <Typography
        sx={{
          marginBottom: "14px",
          fontSize: "14px",
          color: "#000000",
        }}
      >
        This is the email we will use to contact you:{" "}
        <strong>{userDetails?.email}</strong>
      </Typography>

      {/* Dropdown */}
      <Select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        displayEmpty
        fullWidth
        sx={{
          marginTop: "10px",
          backgroundColor: "#FFF",
          color: "#8B5E3C",
          height: "45px",
          width: "50%",
          marginBottom: "10px",
        }}
      >
        <MenuItem value="">Select an option</MenuItem>
        {inquiryOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      {/* Text Area */}
      <TextField
        multiline
        rows={8}
        placeholder="Please explain in detail how we can help you."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        fullWidth
        sx={{
          marginTop: "20px",
          backgroundColor: "#FFF",
        }}
      />

      {/* Send Button */}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            marginTop: "20px",
            backgroundColor: loading ? "#A07050" : "#B98A67",
            color: "#FFF",
            fontWeight: "bold",
            padding: "10px 20px",
            "&:hover": { backgroundColor: "#A07050" },
          }}
        >
          {loading ? "Sending..." : "SEND"}
        </Button>
      </Box>
    </Box>
  );
};

export default InquiryForm;
