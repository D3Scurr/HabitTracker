import React, { createContext, useContext, useEffect,useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
    const [data,setData] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3001/api")
            .then((res) => res.json())
            .then(setData);
    }, []);

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )
}

export function useData() {
    return useContext(DataContext);
}