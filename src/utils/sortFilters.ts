import { ISort, IFilter } from './../interfaces';

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

export const useFilters = (tableFilters: any) => {
    const allFilters: any = Object.keys(tableFilters);
    const updatedFilters: IFilter[] = [];
    if (allFilters.length > 0) {
      allFilters?.forEach((filter: string) => {
        if(tableFilters[filter]) {
          let singleFilter = {
            name: '',
            value: '' as string [] | string,
            operator: ''
          }
          if (filter === 'genre' || filter === 'contentRating') {
            const googlePlayStorValues: string[] = [];
            const appStorValues: string[] = [];
            let appStorInfo: any = {
              name: '',
              value: '' as String[] | string,
              operator: ''
            };
            let googlePlayStorInfo: any = {
              name: '',
              value: '' as String[] | string,
              operator: ''
            };
            tableFilters[filter]?.forEach((key: string, index: number, data: string[]) => {
              const filterValues = key.split('?');
              if (data?.length === 1) {
                singleFilter = {
                  name:  filterValues[0],
                  value: filterValues[1],
                  operator: filterValues[2]
                }
              } else {
                if(filterValues[0].split('.')[0] === 'googlePlayStoreInfo') {
                  googlePlayStorValues.push(filterValues[1]);
                  googlePlayStorInfo = {
                    name: filterValues[0],
                    value: googlePlayStorValues,
                    operator: filterValues[2]
                  }
                }
                if(filterValues[0].split('.')[0] === 'appStoreInfo') {
                  appStorValues.push(filterValues[1]);
                  appStorInfo = {
                    name: filterValues[0],
                    value: appStorValues,
                    operator: filterValues[2]
                  }
                }
              }
            })
            if (appStorInfo.value) {
              updatedFilters.push(appStorInfo);
            }
            if (googlePlayStorInfo.value) {
              updatedFilters.push(googlePlayStorInfo);
            }
          } else {
            tableFilters[filter]?.forEach((key: string) => {
              const filterValues = key.split('?');
              updatedFilters.push({
                name:  filterValues[0],
                value: filterValues[1],
                operator: filterValues[2]
              });
            })
          }
        }
      });
    }
    return updatedFilters;
}