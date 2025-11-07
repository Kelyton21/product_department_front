import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export interface Product {
    id: number;
    name: string;
    price: number;
    department:{
        id: number;
        name: string;
    };
}

export interface ProductCreateDTO { 
    name: string;
    price: number;
    idDepartment: number;
}

export interface Department {
    id: number;
    name: string;
}

export const getProducts = () => {
    return axios.get<Product[]>(`${API_BASE_URL}/products`);
}

export const createProduct = (productData: ProductCreateDTO) => {
    return axios.post<Product>(`${API_BASE_URL}/products`, productData);
}

export const searchProducts = (name: string) => {
    return axios.get<Product[]>(`${API_BASE_URL}/products/search`, {
        params: { name }
    });
}

export const getDepartments = () => {
    return axios.get<Department[]>(`${API_BASE_URL}/departments`);
}

export const getProductById = (id: number | string) => {
    return axios.get<Product>(`${API_BASE_URL}/products/${id}`);
};

export const deleteProduct = (id: number) => {
    // O backend retorna 204 No Content, então não esperamos dados de volta
    return axios.delete(`${API_BASE_URL}/products/${id}`);
};