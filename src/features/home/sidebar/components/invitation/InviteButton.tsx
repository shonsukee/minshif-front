import React, { useContext } from "react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/features/components/ui/dialog";
import { Button } from "@/features/components/ui/button";
import { Label } from "@/features/components/ui/label";
import { Input } from "@/features/components/ui/input";
import InviteUser from "../../api/InviteUser";
import { UserContext } from "@/features/context/UserContext";

export const InviteButton = () => {
	const user = useContext(UserContext);

    async function handleInviteUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const formData = new FormData(e.target as HTMLFormElement);
            const email = formData.get('email') as string;

            if (!email) {
                alert('メールアドレスを入力してください。');
                return;
            }

            const response = await InviteUser(email, user?.user?.id);
            alert(response.msg);
        } catch (error) {
            console.error('招待処理でエラーが発生しました:', error);
            alert('招待処理に失敗しました。もう一度お試しください。');
        }
    }

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">ユーザ招待</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[500px]" onOpenAutoFocus={(e) => {e.preventDefault()}} >
				<DialogHeader>
					<DialogTitle>ユーザ招待</DialogTitle>
					<DialogDescription>
						スタッフをグループに招待します。
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleInviteUser}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-3 items-center gap-4">
							<Label htmlFor="email" className="text-right">
								メールアドレス
							</Label>
							<Input name="email" id="email" placeholder={"ex:) minshif@example.com"} className="col-span-2" />
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">登録</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};