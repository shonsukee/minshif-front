/**
 * 指定された時刻に9時間を加算し、ISO形式の時刻文字列を返す関数
 *
 * @param time - 変換対象の時刻文字列（HH:MM形式）
 * @returns 9時間加算されたISO形式の時刻文字列
 */
export const formatTimeToISO = (time: string): string => {
	const date = new Date(`2000-01-01T${time}:00.000+09:00`);
	date.setHours(date.getHours() + 9);

	return date.toISOString().split('.')[0] + ".000+09:00";
}

/**
 * YYYY-MM-DD to YYYY年MM月DD日
 * @param date - YYYY-MM-DD形式
 * @returns YYYY年MM月DD日
 */
export const format_jp_date = (date: string) => {
	return date.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$1年$2月$3日');
}

/**
 * ISO8601形式の時刻文字列をHH:MM形式に変換する関数
 * @param time - ISO8601形式(YYYY-MM-DDTHH:MM:SSZ)
 * @returns HH:MM形式
 */
export const format_time = (time: string) => {
	return time.split('T')[1].slice(0, 5);
}


/**
 * 開始時間が終了時間より未来の時間を選択しているか判定する関数
 * @param startTime - 比較対象の開始時間（HH:MM形式）
 * @param endTime - 比較対象の終了時間（HH:MM形式）
 * @returns boolean - 正常な時間の選択であれば true
 */
export const isStartTimeBeforeEndTime = (startTime: string, endTime: string): boolean => {
	const startDate = new Date(`2000-01-01T${startTime}:00`);
	const endDate = new Date(`2000-01-01T${endTime}:00`);
	return startDate.getTime() < endDate.getTime();
};
