export interface Product {
  nome:         string;
  preco:        number;
  imagem:       string;
  categoria:    string;
  categoriaimg: string;
  isLoading:    boolean;
}




export interface ProductEntity {
  id: number;
  nome: string;
  preco: string;
  imagem: {
    id: string;
    path: string;
  };
  categoria: {
    id: number;
    nome: string;
    img: {
      id: string;
      path: string;
    };
  };
}

export interface ConvertedProduct {
  nome: string;
  preco: number;
  imagem: string;
  categoria: string;
  categoriaimg: string;
  isLoading: boolean;
}
