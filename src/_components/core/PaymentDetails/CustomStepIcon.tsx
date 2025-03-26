import { StepIconProps } from "@mui/material/StepIcon";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CustomStepIcon = (props: StepIconProps) => {
  const { active, completed } = props;

  return completed ? (
    <CheckCircleIcon sx={{ color: "#8B5E3B" }} />
  ) : (
    <div
      style={{
        width: 24,
        height: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        backgroundColor: active ? "#C48E70" : "#E0C4B3",
        color: active ? "#fff" : "#8B5E3B",
      }}
    >
      {props.icon}
    </div>
  );
};
export default CustomStepIcon;
