export interface BaseResponse<T>{
    status: number;
    message: string;
    data: T;
}

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST'
}

export function isSuccess<T>(response: BaseResponse<T>): boolean {
    return response.status === 200;
}
