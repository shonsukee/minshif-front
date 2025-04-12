import { Bounce, Slide, toast } from "react-toastify";

export const notifyError = (message: string) => {
	toast.error(message, {
		position: "bottom-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
		transition: Bounce,
	});
}

export const notifySuccess = (message: string) => {
	toast.success(message, {
		position: "bottom-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
		transition: Slide,
	});
}
