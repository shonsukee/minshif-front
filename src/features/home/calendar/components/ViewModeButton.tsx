import { ViewModeButtonProps } from "../types/index";

export const ViewModeButton = ({ viewMode, setViewMode }: ViewModeButtonProps) => {
	return (
		<div className="viewModeBtn">
			<button
				className={`viewBtn ${viewMode === "month" ? "active" : ""}`}
				onClick={() => setViewMode("month")}
				>
				月
			</button>
			<button
				className={`viewBtn ${viewMode === "week" ? "active" : ""}`}
				onClick={() => setViewMode("week")}
			>
				週
			</button>
			<button
				className={`viewBtn ${viewMode === "day" ? "active" : ""}`}
				onClick={() => setViewMode("day")}
			>
				日
			</button>
		</div>
	);
}
