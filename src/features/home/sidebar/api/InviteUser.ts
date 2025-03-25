const InviteUser = async (email: string, managerId: string | undefined) => {
    try {
        if (!managerId) {
            throw new Error('管理者IDが指定されていません');
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invitation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                invitee: {
                    email: email
                },
                manager: {
                    user_id: managerId,
                }
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error: unknown) {
        console.error('Error inviting user:', error);
        const errorMessage = error instanceof Error
            ? error.message
            : '不明なエラーが発生しました';
        return { error: errorMessage };
    }
};

export default InviteUser;
