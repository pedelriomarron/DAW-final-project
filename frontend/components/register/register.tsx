import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchRegister } from "../../redux/actions/registerActions"

export const Register = () => {

    const { register } = useSelector((state: any) => { return state.register })
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(register)
    }, [dispatch])

    const validation = (e: any) => {
        e.preventDefault();
        const data = new FormData(e.target);
        fetchRegister(dispatch, data)
    }

    return (
        <>
            <h1>register:</h1>
            <form method="POST" onSubmit={(e) => validation(e)}>
                <div>
                    <label htmlFor="email">email:</label>
                    <input type="text" name="email" id="email" />
                </div>
                <div>
                    <label htmlFor="username">username:</label>
                    <input type="text" name="username" id="username" />
                </div>
                <div>
                    <label htmlFor="nombre">nombre:</label>
                    <input type="text" name="nombre" id="nombre" />
                </div>
                <div>
                    <label htmlFor="apellidos">apellidos:</label>
                    <input type="text" name="apellidos" id="apellidos" />
                </div>
                <div>
                    <label htmlFor="password">password:</label>
                    <input type="password" name="password" id="password" />
                </div>
                <input type="submit" value="register" />
            </form>

        </>
    )
}
