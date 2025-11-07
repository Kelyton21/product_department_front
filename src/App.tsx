import { Button } from "./components/ui/button"
import { Search,PlusCircle, Trash2 } from 'lucide-react';
import { Input } from "./components/ui/input"
import { Table,TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table"
import { Dialog,DialogClose,DialogContent, DialogDescription,DialogFooter,DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog";
import { Label } from "./components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./components/ui/select";
import { getProducts, searchProducts, createProduct, getDepartments, Product, Department, getProductById } from './api/products';
import { deleteProduct } from './api/products'; 
import * as React from 'react';


function App() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [departments, setDepartments] = React.useState<Department[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchId, setSearchId] = React.useState('');

  const [newProduct, setNewProduct] = React.useState({
        name: '',
        price: 0,
        departmentId: 0, 
    });

  const fetchProducts = React.useCallback(async (term: string = '') => {
        setIsLoading(true);
        try {
            const response = term 
                ? await searchProducts(term)
                : await getProducts();
            
            setProducts(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);
    
  const fetchDepartments = async () => {
      try {
          const response = await getDepartments();
          setDepartments(response.data);
      } catch (error) {
          console.error("Erro ao carregar departamentos:", error);
      }
  };

  // Função para criar um novo produto (POST)
  const handleCreateProduct = async (event: React.FormEvent) => {
      event.preventDefault(); // Impede o recarregamento da página

      try {
          // Criar o objeto de dados conforme esperado pela API (ProductDTO)
          const dataToSubmit = {
              name: newProduct.name,
              price: newProduct.price,
              idDepartment: Number(newProduct.departmentId) // Garante que seja um número
          };
          
          await createProduct(dataToSubmit);
          
          alert("Produto cadastrado com sucesso!");
          // 4. Atualiza a lista após o cadastro e limpa o formulário
          fetchProducts(); 
          setNewProduct({ name: '', price: 0, departmentId: 0 }); 

      } catch (error) {
          console.error("Erro ao cadastrar produto:", error);
          alert("Falha ao cadastrar produto.");
      }
  };

  const handleDeleteProduct = async (productId: number) => {
        // 1. Confirmação (Importante!)
        if (!window.confirm("Tem certeza que deseja deletar este produto?")) {
            return; // Usuário cancelou
        }

        try {
            // 2. Chamar a API de delete
            await deleteProduct(productId);
            
            // 3. Atualizar o estado (remover o produto da lista local)
            setProducts(currentProducts => {
                return currentProducts.filter(product => product.id !== productId);
            });

            alert("Produto deletado com sucesso!");

        } catch (error) {
            console.error("Erro ao deletar produto:", error);
            alert("Falha ao deletar produto. Tente novamente.");
        }
    };


  // 3. CICLO DE VIDA (useEffect)
  React.useEffect(() => {
      // Carrega produtos e departamentos na montagem do componente
      fetchProducts(); 
      fetchDepartments();
  }, [fetchProducts]); 

const fetchProductById = async (id: string) => {
    setIsLoading(true);
    try {
        const response = await getProductById(id);
        // O resultado é um objeto, mas a tabela espera um array.
        setProducts([response.data]); 
    } catch (error) {
        console.error("Erro ao buscar por ID:", error);
        // Se o ID não for encontrado (erro 404), limpa a tabela
        setProducts([]); 
    } finally {
        setIsLoading(false);
    }
};

// ATUALIZE A FUNÇÃO handleSearch
const handleSearch = (event: React.FormEvent) => {
    event.preventDefault(); 
    
    // Se o searchId estiver preenchido, ele tem prioridade
    if (searchId) {
        fetchProductById(searchId);
    } 
    // Senão, busca por nome (como antes)
    else {
        fetchProducts(searchTerm);
    }
};

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Gerenciamento de Produtos</h1>
          <div className="flex items-center justify-between">
            <form className="flex items-center justify-between gap-3" onSubmit={handleSearch}>
              <Input name="id" placeholder="ID do produto" className="w-auto" value={searchId} onChange={(e) => { setSearchId(e.target.value); setSearchTerm(''); }}></Input>
              <Input name="name" placeholder="Nome do produto" className="w-auto" value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); setSearchId('');}}></Input>
              <Button type="submit" ><Search/>Buscar</Button>

            {/* Inicio do modal*/}
            </form>
            <Dialog>
              <DialogTrigger asChild>  
                <Button className=" bg-green-600 font-bold hover:bg-green-700"><PlusCircle/> Novo Produto</Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Novo produto</DialogTitle>
                  <DialogDescription>Criar um novo produto</DialogDescription>
                </DialogHeader>

                <form className="space-y-6" onSubmit={handleCreateProduct}>
                  <div className="grid grid-cols-4 items-center text-left gap-3">
                    <Label htmlFor="nome">Produto</Label>
                    <Input type="text" className="col-span-3" placeholder="Nome" value={newProduct.name} onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}/>
                  </div>

                  <div className="grid grid-cols-4 items-center text-left gap-3">
                    <Label htmlFor="preco">Preço</Label>
                    <Input min="0" step="0.01" type="number" className="col-span-3" placeholder="R$ 0,00" value={newProduct.price} onChange={(e) => setNewProduct(prev => ({ ...prev, price: Number(e.target.value) }))}/>
                  </div>

                  <div className="grid grid-cols-4 items-center text-left gap-3">
                    <Label htmlFor="departamento">Departamento</Label>
                    <Select name="departamento" value={newProduct.departmentId.toString()} onValueChange={(value) => setNewProduct({...newProduct, departmentId: Number(value)})}>
                      <SelectTrigger className="w-[230px]">
                        <SelectValue placeholder="Selecione um Departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Departamentos</SelectLabel>
                              {isLoading ? (
                                          <SelectItem value="loading" disabled>Carregando...</SelectItem>
                                        ) : (
                                            departments.map(dept => (
                                                <SelectItem key={dept.id} value={dept.id.toString()}>
                                                    {dept.name}
                                                </SelectItem>
                                            ))
                                        )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="submit" className="bg-red-600 font-bold hover:bg-red-700 ">Cancelar</Button>
                    </DialogClose>
                    <Button type="submit" className="bg-green-600 font-bold hover:bg-green-700 ">Salvar</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog> 
          {/* Fim do modal */}
          </div>

        <div className="border rounded"></div>

        <Table>
          <TableHeader className="bg-slate-400">
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Nome</TableHead>
            <TableHead className="text-white">Preço</TableHead>
            <TableHead className="text-white">Departamento</TableHead>
            <TableHead className="text-white w-[64px]"></TableHead>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={4} className="text-center">Carregando produtos...</TableCell></TableRow>
            ) : products.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center">Nenhum produto encontrado.</TableCell></TableRow>
            ) : (
              products.map(product => (
                <TableRow key={product.id}>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                                    <TableCell>{product.department.name}</TableCell>
                                    <TableCell>
                                      <Button 
                                          size="sm"
                                          variant="destructive" 
                                          onClick={() => handleDeleteProduct(product.id)}
                                      >
                                          <Trash2 className="h-4 w-4" />
                                      </Button>
                                  </TableCell>
                                </TableRow>
                            ))
                          )}
          </TableBody>

        </Table>
      </div>
    </>
  )
}

export default App
