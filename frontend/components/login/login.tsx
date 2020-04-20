export const Login = () => {
    return (
        <>
            <h1>login:</h1>
            <div>
                <label htmlFor="email">email:</label>
                <input type="text" name="email" id="email" />
            </div>
            <div>
                <label htmlFor="password">password:</label>
                <input type="password" name="password" id="password" />
            </div>
            <input type="button" id="submit" name="submit" value="send" />
        </>
    )
}
