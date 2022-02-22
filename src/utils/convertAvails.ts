export const convertAvails = (labelValue: number) => {
        return Math.abs(Number(labelValue)) >= 1.0e+9
    
        ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(1) + "B"
        : Math.abs(Number(labelValue)) >= 1.0e+6
    
        ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(1) + "M"
        : Math.abs(Number(labelValue)) >= 1.0e+3
    
        ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(1) + "K"
    
        : Math.abs(Number(labelValue));
    
}
