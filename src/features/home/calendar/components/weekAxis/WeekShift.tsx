import { DAY_LIST } from "../constant/index";
import { DayList, Staff, StaffList, Shift, ShiftList, setShifts } from "../../types/index";
import { useContext, useEffect, useState } from "react";
import FetchStaffList from "@/features/home/api/FetchStaffList";
import FetchShiftList from "@/features/home/api/FetchShiftList";
import ShiftModal from "../shift/ShiftModal";
import { addDays } from "date-fns";
import { format_time } from "@/features/util/datetime";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { extractTimeforUI } from "@/features/util/datetime";
import { MembershipContext } from "@/features/context/MembershipContext";
import { UserContext } from "@/features/context/UserContext";

export const WeekShift = ({
	dayList,
	shifts,
	setShifts
}: {
	dayList: DayList,
	shifts: Shift[],
	setShifts: setShifts
}) => {
	const { data: session } = useSession();
	const membershipContext = useContext(MembershipContext);
	const membership = membershipContext?.membership;
	const userContext = useContext(UserContext);
	const user = userContext?.user;
	const [staffList, setStaffList] = useState<StaffList>([]);
	const [shiftList, setShiftList] = useState<ShiftList>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
	const [selectedDate, setSelectedDate] = useState<string>("");
	const [selectedShift, setSelectedShift] = useState<Shift | null>(null);

	/**
	 * スタッフリストの取得
	 */
	useEffect(() => {
		const fetchStaff = async () => {
			if (session && membership?.store_id) {
				try {
					const response = await FetchStaffList(membership.store_id);
					setStaffList(response);
				} catch (error) {
					console.error("Failed to fetch staff list", error);
				}
			}
		};

		fetchStaff();
	}, [session, membership]);

	/**
	 * シフトリストの取得
	 */
	useEffect(() => {
		const fetchShift = async () => {
			if (session && user?.id) {
				try {
					const start_date = addDays(new Date(dayList[0].date), -7).toISOString();
					const end_date = addDays(new Date(dayList[6].date), 7).toISOString();
					const response = await FetchShiftList(user?.id, start_date, end_date);
					setShiftList(response);
				} catch (error) {
					console.error("Failed to fetch shift list", error);
				}
			}
		};

		fetchShift();
	}, [dayList, session]);

	/**
	 * シフトが登録されているか
	 * @param staffShiftList: Shift[]
	 * @param date: string
	 * @param staff: Staff
	 * @returns number
	 */
	const findShifts = (staffShiftList: Shift[], date: string, staff: Staff) => {
		if (!staffShiftList) return [];
		return staffShiftList.filter((shift) => shift.date === date && shift.email === staff.email);
	};

	const handleCellClick = (staff: Staff, date: string, shift: Shift | null) => {
		setSelectedStaff(staff);
		setSelectedDate(date);
		setSelectedShift(shift);
		setIsOpen(true);
	};

	/**
	 * 空のセル
	 * @param staffIndex
	 * @param date
	 * @param staff
	 * @returns jsx
	 */
	const EmptyCell = ({ shiftIndex, date, staff, unregisteredShift }: { shiftIndex: string, date: string, staff: Staff, unregisteredShift: Shift | null }) => (
		<div
			key={shiftIndex}
			onClick={membership?.privilege === "manager" ? () => handleCellClick(staff, date, unregisteredShift) : undefined}
			// className={`cell ${membership?.membership?.privilege !== "staff" ? "pointer-events-none" : ""}`}
			className="cell"

		/>
	);

	/**
	 * シフトのセル
	 * @param date
	 * @returns jsx
	 */
	const Cell = ({ date }: { date: string }) => (
		<>
			{staffList.map((staff, staffIndex) => {
				const shifts = findShifts(shiftList[staffIndex], date, staff);
				const shift = shifts.find((draft) => draft.date === date && draft.email === staff.email);
				const registeredShift = shifts.find(shift => shift.is_registered) ?? null;
				const unregisteredShift = shifts.find(shift => !shift.is_registered) ?? null;

				return (
					<div key={`staff-${staffIndex}`} className="staff">
						{registeredShift ? (
							<div
								key={`registered-${staffIndex}-${registeredShift.id}`}
								onClick={() => handleCellClick(staff, date, registeredShift)}
								className="cell w-full"
							>
								<div className="bg-amber-500 rounded-lg flex items-center justify-center hover:shadow-md hover:bg-amber-600">
									<span className="truncate overflow-hidden whitespace-nowrap max-w-full">
										{extractTimeforUI(registeredShift.start_time)} ~ {extractTimeforUI(registeredShift.end_time)}
									</span>
								</div>
							</div>
						) : shift ? (
							<div
								key={`draft-${staffIndex}-${shift.id}`}
								onClick={() => handleCellClick(staff, date, shift)}
								className="cell w-full"
							>
								<div className="bg-lime-500 rounded-lg flex items-center justify-center hover:shadow-md hover:bg-lime-600">
									{format_time(shift.start_time)} ~ {format_time(shift.end_time)}
								</div>
							</div>
						) : (
							<EmptyCell shiftIndex={`empty-registered-${staffIndex}`} date={date} staff={staff} unregisteredShift={unregisteredShift} />
						)}
						{membership && membership?.privilege === "staff" ? (
							<EmptyCell shiftIndex={`empty-registered-${staffIndex}`} date={date} staff={staff} unregisteredShift={null} />
						) : (
							unregisteredShift ? (
								<div
									key={`unregistered-${staffIndex}-${unregisteredShift.id}`}
									onClick={() => handleCellClick(staff, date, unregisteredShift)}
									className="cell w-full"
								>
									<div className="bg-red-500 rounded-lg flex items-center justify-center hover:shadow-md hover:bg-red-600">
										<span className="truncate overflow-hidden whitespace-nowrap max-w-full">
											{extractTimeforUI(unregisteredShift.start_time)} ~ {extractTimeforUI(unregisteredShift.end_time)}
										</span>
									</div>
								</div>
							) : (
								<EmptyCell shiftIndex={`empty-registered-${staffIndex}`} date={date} staff={staff} unregisteredShift={null} />
							)
						)}
					</div>
				);
			})}
		</>
	);

	return (
		<div>
			{/* 縦軸：1週間の日付表示 */}
			<div className="weekContainer">
				<div className="headline w-[50px] lg:w-[202px]">
					GMT +9
				</div>
				<div className="hidden sm:block sm:w-[9px] sm:min-w-[9px]" />
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
							<li key={key} className="timeslotItem flex justify-start items-center">
								<Image
									src={staff.picture}
									alt={`staff-${key}`}
									className="w-10 h-10 mr-3 rounded-lg"
									width={40}
									height={40}
								/>
								<span className="hidden lg:inline min-w-[50px] lg:min-w-[150px] truncate">
									{staff.user_name}
								</span>
							</li>
						))}
					</ul>
				</div>
				<div className="hidden sm:block sm:w-[9px] sm:min-w-[9px]" />
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

			{/* シフト登録モーダル */}
			{isOpen && selectedStaff && (
				<ShiftModal
					isOpen={isOpen}
					date={selectedDate}
					staff={selectedStaff}
					shift={selectedShift}
					setShifts={setShifts}
					onClose={() => setIsOpen(false)}
				/>
			)}
		</div>
	);
};
