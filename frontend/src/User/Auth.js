export const isUserLogin=()=>{
    const data=localStorage.getItem('user');
    // return true;
    return JSON.parse(data);
}