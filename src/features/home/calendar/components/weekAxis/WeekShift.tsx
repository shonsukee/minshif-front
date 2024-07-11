import { DAY_LIST } from "../constant/index";
import { DayList, Staff, StaffList, Shift, ShiftList } from "../../types/index";
import { useEffect, useState } from "react";
import FetchStaffList from "@/features/home/api/FetchStaffList";
import FetchShiftList from "@/features/home/api/FetchShiftList";
import { useToken } from "@/features/context/AuthContext";
import { addDays } from "date-fns";

export const WeekShift = ({ dayList }: { dayList: DayList }) => {
	const [staffList, setStaffList] = useState<StaffList>([]);
	const [shiftList, setShiftList] = useState<ShiftList>([]);
	const token = useToken();

	/**
	 * スタッフ・シフトリストの取得
	 */
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

		const fetchShift = async () => {
			if (token.token !== '') {
				try {
					const start_date = addDays(new Date(dayList[0].date), -7).toString();
					const end_date = addDays(new Date(dayList[0].date), 7).toString();
					const response = await FetchShiftList(token.token, start_date, end_date);
					setShiftList(response);
				} catch (error) {
					console.error("Failed to fetch shift list", error);
				}
			}
		};

		fetchStaff();
		fetchShift();
	}, [token]);

	/**
	 * 時間の抽出
	 * @param datetime: string
	 * @returns string
	 */
	const extractTime = (datetime: string) => {
		return datetime.split('T')[1].split(':').slice(0, 2).join(':');
	};

	/**
	 * シフトが登録されているか
	 * @param staffShiftList: Shift[]
	 * @param date: string
	 * @param staff: Staff
	 * @returns number
	 */
	const findShifts = (staffShiftList: Shift[], date: string, staff: Staff) => {
		if (!staffShiftList) return [];
		return staffShiftList.filter((shift) => shift.date === date && shift.user_name === staff.user_name);
	};

	/**
	 * 空のセル
	 * @param staffIndex
	 * @param date
	 * @param staff
	 * @returns jsx
	 */
	const EmptyCell = ({ shiftIndex, date, staff }: { shiftIndex: string, date: string, staff: Staff }) => {
		return (
			<div
				key={shiftIndex}
				onClick={() => {
				console.log(date, `${staff.user_name}時`);
				}}
				className="cell"
			/>
		);
	};

	/**
	 * シフトのセル
	 * @param date
	 * @returns jsx
	 */
	const Cell = ({ date }: { date: string }) => {
		return (
		<>
			{staffList.map((staff, staffIndex) => {
			const shifts = findShifts(shiftList[staffIndex], date, staff);
			const registeredShift = shifts.find(shift => shift.is_registered);
			const unregisteredShift = shifts.find(shift => !shift.is_registered);

			return (
				<div key={`staff-${staffIndex}`} className="staff">
				{registeredShift ? (
					<div
						key={`registered-${staffIndex}-${registeredShift.id}`}
						onClick={() => {
							console.log(date, `${staff.user_name}時`);
						}}
						className="cell w-full"
					>
						<div className="bg-amber-500 rounded-lg px-2.5 flex items-center justify-center hover:shadow-md hover:bg-amber-600">
							{extractTime(registeredShift.start_time)} ~ {extractTime(registeredShift.end_time)}
						</div>
					</div>
				) : (
					<EmptyCell shiftIndex={`empty-registered-${staffIndex}`} date={date} staff={staff} />
				)}
				{unregisteredShift ? (
					<div
						key={`unregistered-${staffIndex}-${unregisteredShift.id}`}
						onClick={() => {
							console.log(date, `${staff.user_name}時`);
						}}
						className="cell w-full"
					>
						<div className="bg-red-500 rounded-lg px-2.5 flex items-center justify-center hover:shadow-md hover:bg-red-600">
							{extractTime(unregisteredShift.start_time)} ~ {extractTime(unregisteredShift.end_time)}
						</div>
					</div>
				) : (
					<EmptyCell shiftIndex={`empty-unregistered-${staffIndex}`} date={date} staff={staff} />
				)}
				</div>
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
										<Cell date={dayItem.date} />
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
