import bcrypt from "bcryptjs"

export default function createUser() {
    const password = "passwordTest"
    const hashedPassword = bcrypt.hash(password, 12)
    return (
        <p>{hashedPassword}</p>
    )
}