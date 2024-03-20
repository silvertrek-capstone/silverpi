import SignUpForm from '@/components/signupform'

export default function Signup({searchParams}) {
    const inviteId = searchParams.invite || ''
    return(
        <SignUpForm invite={inviteId}/>
    )
}