export const isTokenExpired = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.expireAt) return true;
    return Date.now() > user.expireAt;
};
