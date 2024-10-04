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

/**
 * 日付のstring型から時間を抽出
 * @param date - 日付のstring型
 * @returns 時間のstring型
 */
export const extractTime = (date: Date): string => {
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');

	return `${hours}:${minutes}`;
}

/**
 * 日付のstring型から時間を抽出し、UI表示用に整形
 * @param datetime - 日付のstring型
 * @returns 時間のstring型
 */
export const extractTimeforUI = (datetime: string): string => {
	return datetime.split('T')[1].split(':').slice(0, 2).join(':');
};

/**
 * 日付のstring型から時間を抽出し、UI表示用に整形
 * @param datetime - 日付のstring型
 * @returns 時間のstring型
 */
export const extractDateforUI = (datetime: string): string => {
	return datetime.split('T')[0];
};

/**
 * 日付のstring型から日付を抽出
 * @param date - 日付のstring型
 * @returns 日付のnumber型
 */
export const extractDate = (date: string): number => {
	const date_Obj = new Date(date);
	return date_Obj.getDate();
}

/**
 * 日付のstring型から年月日を抽出
 * @param date - 日付のstring型
 * @returns 日付のnumber型
 */
export const extractYMD = (date: string): number => {
	const date_Obj = new Date(date);
	const year = date_Obj.getFullYear();
	const month = ('0' + (date_Obj.getMonth() + 1)).slice(-2);
	const day = ('0' + date_Obj.getDate()).slice(-2);
	return parseInt(`${year}${month}${day}`, 10);
}

/**
 * 指定された日付オブジェクトからYYYY-MM-DD形式の日付文字列を返す関数
 * @param dateStr - JavaScriptのDateオブジェクトから生成された文字列
 * @returns YYYY-MM-DD形式の日付文字列
 */
export const formatDateToISO = (date: Date): string => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
};
