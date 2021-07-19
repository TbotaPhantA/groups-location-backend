import { ApiProperty } from "@nestjs/swagger";

export class TokensOutputDto {

    @ApiProperty({
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZGZhYzAwOWEtM2MwZS00ZmM1LTg0YjctNDAyMTk0ODcwNWIwIiwiZW1haWwiOiJ6YWJvcjIzN0BnbWFpbC5jb20iLCJuYW1lIjoiWm9ib3IyMjgiLCJpYXQiOjE2MjY2NDkxMDAsImV4cCI6MTYyNjY0OTQwMH0.9MRVVw-TnOp7pgUFEshfekDep530emB1f5Lb0N9XojA", 
        description: 'jwt token which lives for 5 minutes, contains user informatinon in payload'
    })
    access_token: string;

}