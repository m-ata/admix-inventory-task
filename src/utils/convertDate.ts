export const convertDate = (date: string) : string => {
    const localDate = new Date(date);
    return `${localDate.getDay()}/${localDate.getMonth()}/${localDate?.getFullYear()}`;
}