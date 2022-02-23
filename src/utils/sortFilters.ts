import { ISort } from './../interfaces';

export const useSorts = (sorts: ISort[], field: string, order: string) => {
    const updatedSorts = [...sorts];
    const sortWithExistedField = updatedSorts.find(s => s.field === field);
    if (sortWithExistedField) {
      const index = updatedSorts?.indexOf(sortWithExistedField);
      updatedSorts[index] = { field: field, desc: order === 'descend' ? true : false }
    } else {
      updatedSorts.push({ field: field, desc:order === 'descend' ? true : false })
    }
    return updatedSorts;
}