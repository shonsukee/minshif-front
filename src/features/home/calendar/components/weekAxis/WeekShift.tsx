import { DAY_LIST } from "../constant/index";
import { DayList, StaffList } from "../../types/index";
import { useEffect, useState } from "react";
import FetchStaffList from "@/features/home/api/FetchStaffList";
import { useToken } from "@/features/context/AuthContext";

export const WeekShift = ({ dayList }: { dayList: DayList }) => {
	const [staffList, setStaffList] = useState<StaffList>([]);
	const token = useToken();

	useEffect(() => {
		const fetchStaff = async () => {
			if (token.token !== '') {
				try {
					const response = await FetchStaffList(token.token);
					setStaffList(response);
				} catch (error) {
					console.error("Failed to fetch staff list", error);
				}
			}
		};
		fetchStaff();
	}, [token]);

	const EmptyCell = (date: { date: string }) => {
		return (
		<>
			{Object.entries(staffList).map(([key, staff]) => {
				return (
					<div
						key={key}
						onClick={() => {
							console.log(date, `${staff.user_name}時`);
						}}
						className="empty"
					/>
				);
			})}
		</>
		);
	};

	return (
		<div>
			{/* 縦軸：1週間の日付表示 */}
			<div className="weekContainer">
				<div className="headline">
					GMT +9
				</div>
				<div className="element-space" />
				<div className="dateContainer">
					{dayList.map((dayItem, index) => {
						const dayInfo = DAY_LIST.find((day) => day.id === dayItem.day);
						const dateInfo = dayItem.date.split("-").at(2) ?? "";

						return (
							<div
								key={dayItem.date}
								style={{ gridColumn: index + 1 }}
								className="element-wrap"
							>
								<div className="element-column-line"/>
								<div className="element">
									<div className="flex justify-center items-center">
										{dayInfo ? dayInfo.day : "unknown"}
									</div>
									<div className="date">
										{dateInfo[0] === "0" ? dateInfo[1] : dateInfo}
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<div className="element-scroll" />
			</div>
			{/* 横軸：スタッフのシフト表示 */}
			<div className="shiftContainer">
				<div className="timeslotBox">
					<ul className="shiftList">
					{Object.entries(staffList).map(([key, staff]) => (
						<li key={key} className="timeslotItem">
							{staff.user_name}
						</li>
					))}
					</ul>
				</div>
				<div className="element-space"/>
				{/* カレンダー要素 */}
				<div className="calendarContainer">
					<div className="calendarWrapper">
						<div>
							{Object.entries(staffList).map(([key, staff]) => (
								<div key={key}>
									<div className="horizontalHeight" />
								</div>
							))}
						</div>
						<div className="eventContainer">
							{dayList.map((dayItem) => {
								return (
									<div
										key={dayItem.date}
										className="calendarColumn"
									>
										<EmptyCell date={dayItem.date} />
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
