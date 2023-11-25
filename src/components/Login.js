import React, { useState, useEffect } from "react";
import GetLogin from "api/v1/GetLogin";

export default function Login() {
	const [info, setInfo] = useState([]);
	useEffect(() => {
		GetLogin().then(data => {
			setInfo(data);
		});
	},[]);

	return (
		<div>
			<h1>ログイン</h1>
			<ul>
				{info.map((key) => {
					return (
						<li key={key.id}>
							{key.user_name} {key.email}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
