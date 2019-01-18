export interface IAPIErrorSource {
    pointer?: string | any;
    param?: string | any;
}
export interface IAPIError {
    title: string;
    statusCode: number;
    source: IAPIErrorSource;
    detail: string;
}
export declare const APIErrorSource: (errorSource?: IAPIErrorSource) => IAPIErrorSource;
export declare const APIError: (error: any) => IAPIError;
