export type LoginType = {
    username: string,
    password: string
}

export type SignUpType = {
    username: string,
    mode: string
}

export type VerifyOtpType = {
    otp: string,
    reference: string | null,
    username: string
}

export type CompleteSignup = {
    first_name: string,
    last_name: string,
    username: string,
    password: string,
    password_confirmation: string,
    accept_terms: boolean
}