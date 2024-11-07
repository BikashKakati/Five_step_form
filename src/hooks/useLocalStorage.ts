export const useLocalStorage = () =>{
    function saveDataToStorage<T>(key:string,data:T){
        return localStorage.setItem(key, JSON.stringify(data));
    }

    function getStoredData(key:string){
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item):  null;
    }
    return {
        saveDataToStorage,
        getStoredData
    }
}