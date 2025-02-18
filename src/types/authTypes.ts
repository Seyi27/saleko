export type LoginType = {
    username: string,
    password: string
}

export type SignUpType = {
    username: string,
    mode: string
}

export type ResetPasswordType = {
    otp: string,
    password: string,
    password_confirmation: string,
    username: string
}

export type VerifyOtpType = {
    otp: string,
    reference_code: string | null,
    sent_to: string
}

export type CompleteSignupType = {
    first_name: string,
    last_name: string,
    username: string,
    password: string,
    password_confirmation: string,
    accept_terms: boolean
}

export type googleAuthCallbackType = {
    channel: string,
    token: string
}