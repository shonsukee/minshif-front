import { DAY_LIST } from "../constant/index";
import { DayList, FactorList } from "../../types/index";

export const WeekShift = ({ dayList, factorList }: {dayList: DayList, factorList: FactorList }) => {
	const EmptyCell = (date: { date: string }) => {
		return (
		<>
			{factorList.map((factor) => {
				return (
					<div
						key={factor.name}
						onClick={() => {
							console.log(date, `${factor.name}時`);
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
						{factorList.map((factor) => {
							return (
								<li key={factor.id} className="timeslotItem">
									{factor.name}
								</li>
							);
						})}
					</ul>
				</div>
				<div className="element-space"/>
				{/* カレンダー要素 */}
				<div className="calendarContainer">
					<div className="calendarWrapper">
						<div>
							{factorList.map((factor) => (
								<div key={factor.id}>
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
