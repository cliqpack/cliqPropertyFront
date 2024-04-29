export const head = () => {
    let authUser = JSON.parse(localStorage.getItem("authUser"));
    return {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",

        Authorization: "Bearer " + authUser?.token,
    };
}