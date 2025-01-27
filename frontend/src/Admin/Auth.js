export const isAdminLogin=()=>{
    const data=localStorage.getItem('admin');
    return JSON.parse(data);
}