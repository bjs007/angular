﻿export class User {
    id: number;
    name: string;
    email: string;
    password: string;
}

export class UserRegistrationRequest {
    name: string;
    emailId: string;
    password: string;
}