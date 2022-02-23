export const convertAvails = (labelValue: number) => {

        return Math.abs(Number(labelValue)) >= 1.0e+9
    
        ? Number((Math.abs(Number(labelValue)) / 1.0e+9).toFixed(1)) + "B"
        : Math.abs(Number(labelValue)) >= 1.0e+6
    
        ? Number((Math.abs(Number(labelValue)) / 1.0e+6).toFixed(1)) + "M"
        : Math.abs(Number(labelValue)) >= 1.0e+3
    
        ? Number((Math.abs(Number(labelValue)) / 1.0e+3).toFixed(1)) + "K"
    
        : Math.abs(Number(labelValue));
    
}
