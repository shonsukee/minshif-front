export type Result<T> = { data: T } | { error: string };

export interface FetchAuthCodeProps {
    id: number;
    user_id: string;
    auth_code: number;
    created_at: string;
    updated_at: string;
}