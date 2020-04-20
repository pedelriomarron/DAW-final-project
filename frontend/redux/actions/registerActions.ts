import { endpoints } from '../../endpoint';
export const FETCH_REGISTER = "FETCH_REGISTER";




export const fetchRegister = (dispatch: any, form: any) => {
    var object: any = {};
    form.forEach(function (value: any, key: any) {
        object[key] = value;
    });
    var json: any = JSON.stringify(object);

    fetch(endpoints.register, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: json
        // body: JSON.stringify(Object.fromEntries(form));


    })
        .then((res: any) => res.json())
        .then((res: any) => dispatch({ type: FETCH_REGISTER, data: res }))
};
