import { Button } from "./components/ui/button"
import { Search,PlusCircle } from 'lucide-react';
import { Input } from "./components/ui/input"
import { Table,TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table"
import { Dialog,DialogContent, DialogDescription,DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./components/ui/select";


function App() {
  return (
    <>
      <div className="p-6 max-w-4xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Gerenciamento de Produtos</h1>
          <div className="flex items-center justify-between">
            <form className="flex items-center justify-between gap-3">
              <Input name="id" placeholder="ID do produto" className="w-auto"></Input>
              <Input name="name" placeholder="Nome do produto" className="w-auto"></Input>
              <Button type="submit" variant="outline"><Search/>Buscar</Button>
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

                <form className="space-y-6">
                  <div className="grid grid-cols-4 items-center text-left gap-3">
                    <Label htmlFor="nome">Produto</Label>
                    <Input type="text" className="col-span-3" placeholder="Nome"/>
                  </div>

                  <div className="grid grid-cols-4 items-center text-left gap-3">
                    <Label htmlFor="preco">Preço</Label>
                    <Input min="0" step="0.01" type="number" className="col-span-3" placeholder="R$ 0,00"/>
                  </div>

                  <div className="grid grid-cols-4 items-center text-left gap-3">
                    <Label htmlFor="departamento">Departamento</Label>
                    <Select>
                      <SelectTrigger className="w-[230px]">
                        <SelectValue placeholder="Selecione um Departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Departamentos</SelectLabel>
                            <SelectItem value="eletronicos">Eletrônicos</SelectItem>
                            <SelectItem value="eletrodomesticos">Eletrodomésticos</SelectItem>
                            <SelectItem value="moveis">Móveis</SelectItem>
                            <SelectItem value="roupas">Roupas</SelectItem>
                            <SelectItem value="alimentos">Alimentos</SelectItem>
                            <SelectItem value="beleza">Beleza e Perfumaria</SelectItem>
                            <SelectItem value="esportes">Esportes</SelectItem>
                            <SelectItem value="brinquedos">Brinquedos</SelectItem>
                            <SelectItem value="limpeza">Limpeza</SelectItem>
                            <SelectItem value="saude">Saúde</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                </form>
              </DialogContent>
            </Dialog>

          </div>
        <div className="border rounded"></div>
        <Table>
          <TableHeader className="bg-slate-400">
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Nome</TableHead>
            <TableHead className="text-white">Preço</TableHead>
            <TableHead className="text-white">Departamento</TableHead>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Microondas</TableCell>
              <TableCell>R$ 300,00</TableCell>
              <TableCell>Eletrônicos</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2</TableCell>
              <TableCell>Geladeira</TableCell>
              <TableCell>R$ 1.200,00</TableCell>
              <TableCell>Eletrônicos</TableCell>
            </TableRow>
            <TableRow></TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default App
